import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import './userEditPropierties.css'

export const UserEditPropierties = () => {
  const { token, user } = useContext(AuthContext);
  const { property_id } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [reload, setReload] = useState(true);

  const [fileType, setFileType] = useState(1);
  const [adminFile, setAdminFile] = useState(1);

  const handleChange = (e, type, admin) => {
    const upFiles = Array.from(e.target.files);
    setFileType(type);
    console.log(type);
    setAdminFile(admin);
    console.log(admin);

    setNewFiles(upFiles);
  }

  const submitImg = async (file_type, admin_file) => {
    const newFormData = new FormData();

    if (files) {
      for (const elem of newFiles) {
        newFormData.append('img', elem);
      }
    }

    //Aqui cambia el parametro si es una 1=imagen/2=plano/3=archivo
    newFormData.append('file_type', file_type);
    //Aqui cambia el parametro si es admin=true colaborador=false
    newFormData.append('admin_file', admin_file);

    try {
      const res = await fetchData(
        `/admin/postImg/${property_id}`,
        'POST',
        newFormData,
        token
      );
      setReload(!reload);
      
    } catch (error) {
      console.log(error);
    }

    //
  };

  const deleteImg = async (file_id, filename) => {
    const data = { file_id, property_id, filename };

    try {
      const res = await fetchData('/admin/delImg', 'POST', data, token);
      setReload(!reload);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await fetchData(
          `/admin/getFiles/${property_id}`,
          'GET',
          null,
          token
        );
        
        setFiles(res.data.files);
      } catch (error) {
        console.log('Error al traer los archivos', error);
      }
    };
    getFiles();
  }, [property_id, reload]);

  const descargarImagen = async (filename) => {
  const url = `${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${filename}`;
  try {
    const response = await fetch(url, {
      mode: 'cors',
    });
    if (!response.ok) {
      throw new Error('No se pudo descargar la imagen');
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename.split("-")[2];
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error al descargar la imagen:', error);
  }
};

useEffect(()=>{
    if (!newFiles || newFiles.length === 0) return; // nada que hacer
      submitImg(fileType,adminFile);

  },[newFiles]);

  return (
    <div>
      <div className="bg-form d-flex flex-column  align-items-center py-5">
        <h2 className="text-white">Administrar propiedades</h2>
        <div className="line-title-white mb-5"></div>

        <div>
          
          <div className='d-flex justify-content-center gap-2 mb-3'>
            <button
              className='btn-1 btn-edit-infovivienda'
              onClick={()=>navigate(`/user/misInmuebles`)}>
              Volver a Mis Propiedades
            </button>
            <button
              className='btn-1 btn-edit-infovivienda'
              onClick={()=>navigate(`/user/infoVivienda/${property_id}`)}>
              Ir a Vivienda 🏡
            </button>
          </div>
          
          <Container>
            <section className="p-3 form-container">
              <h2 className="fs-3">Imágenes</h2>
              <hr />
              <div className="d-flex flex-wrap">
                {files.map((elem, index) => {
                  if (elem.file_type === 1) {
                    return (
                      <div className="card-file">
                        <Card key={index}>
                          <img
                            src={`${
                              import.meta.env.VITE_SERVER_IMAGES
                            }/propiedades/${elem.filename}`}
                          />
                          <div className="buttons-file">
                            <button onClick={()=>{descargarImagen(elem.filename)}} className='fs-3 btn-none'><i class="bi-user bi-cloud-arrow-down-fill"></i></button>
                            {(user.user_type !== 2 || !elem.admin_file) && (
                              <a
                                onClick={() => {
                                  deleteImg(elem.file_id, elem.filename);
                                }}
                                className="fs-3"
                              >
                                <i className="bi-user bi-trash3-fill"></i>
                              </a>
                            )}
                          </div>
                        </Card>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="d-flex justify-content-center pt-4">
                <Form className="d-flex align-items-center gap-3">
                  <Form.Group controlId="formImg1">
                    <Form.Label className="m-0 fs-3 text-primary">
                      <i className="bi-user bi-file-earmark-arrow-up-fill "></i>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="img"
                      multiple
                      hidden
                      onChange={(e)=>handleChange(e,1,0)}
                    ></Form.Control>
                  </Form.Group>
                  {/* <button
                    type="button"
                    className="btn-1 m-0"
                    onClick={() => submitImg(1, 0)}
                  >
                    Subir
                  </button> */}
                </Form>
              </div>
            </section>
          
          <section className="p-3 mt-5 form-container">
            <h2 className="fs-3">Planos</h2>
            <hr />
            <div className="d-flex flex-wrap">
              {files.map((elem, index) => {
                if (elem.file_type === 2) {
                  return (
                    <div className="card-file">
                      <Card key={index}>
                        <img
                          src={`${
                            import.meta.env.VITE_SERVER_IMAGES
                          }/propiedades/${elem.filename}`}
                        />
                        <div className="buttons-file">
                          <button onClick={()=>{descargarImagen(elem.filename)}} className='fs-3 btn-none'><i class="bi-user bi-cloud-arrow-down-fill"></i></button>
                          {(user.user_type !== 2 || !elem.admin_file) && (
                            <a
                              onClick={() => {
                                deleteImg(elem.file_id, elem.filename);
                              }}
                              className="fs-3"
                            >
                              <i className="bi-user bi-trash3-fill"></i>
                            </a>
                          )}
                        </div>
                      </Card>
                    </div>
                  );
                }
              })}
            </div>
            <div className="d-flex justify-content-center pt-4">
              <Form className="d-flex align-items-center gap-3">
                <Form.Group controlId="formImg2">
                  <Form.Label className="m-0 fs-3 text-primary">
                    <i className="bi-user bi-file-earmark-arrow-up-fill"></i>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    multiple
                    hidden
                    onChange={(e)=>handleChange(e,2,0)}
                  ></Form.Control>
                </Form.Group>
                {/* <button
                  variant="primary"
                  type="button"
                  className="btn-1 m-0"
                  onClick={() => submitImg(2, 0)}
                >
                  Subir
                </button> */}
              </Form>
            </div>
          </section>
          <section className="p-3 mt-5 form-container">
            <h2 className="fs-3">Archivos</h2>
            <hr />
            <div className="d-flex flex-column card-archives">
              {files.map((elem, index) => {
                if (elem.file_type === 3) {
                  return (
                    <div
                      key={index}
                      className={`d-flex justify-content-between align-items-center p-3 ${
                        index % 2 ? '' : 'bg-primary-color'
                      }`}
                    >
                      <div>{elem.filename.split('-')[2]}</div>
                      <div>
                        <button onClick={()=>{descargarImagen(elem.filename)}} className='fs-3 pe-3 btn-none'><i class="bi-user bi-cloud-arrow-down-fill"></i></button>
                        {(user.user_type !== 2 || !elem.admin_file) && (
                          <a
                            onClick={() => {
                              deleteImg(elem.file_id, elem.filename);
                            }}
                            className="fs-3 pe-3"
                          >
                            <i className="bi-user bi-trash3-fill"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="d-flex justify-content-center pt-4">
              <Form className="d-flex align-items-center gap-3">
                <Form.Group controlId="formImg3">
                  <Form.Label className="m-0 fs-3 text-primary">
                    <i className="bi-user bi-file-earmark-arrow-up-fill"></i>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    multiple
                    hidden
                    className="btn-1"
                    onChange={(e)=>handleChange(e,3,0)}
                  ></Form.Control>
                </Form.Group>
                {/* <button
                  className="btn-1 m-0"
                  type="button"
                  onClick={() => submitImg(3, 0)}
                >
                  Subir
                </button> */}
              </Form>
            </div>
          </section>
          </Container>
          <div className='d-flex justify-content-center gap-2 mb-3'>
            <button
              className='btn-1 btn-edit-infovivienda'
              onClick={()=>navigate(`/user/misInmuebles`)}>
              Volver a Mis Propiedades
            </button>
            <button
              className='btn-1 btn-edit-infovivienda'
              onClick={()=>navigate(`/user/infoVivienda/${property_id}`)}>
              Ir a Vivienda 🏡
            </button>
          </div>
        </div>
      </div>
    </div>
       
  );
};
