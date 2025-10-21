import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';


export const UserEditPropierties = () => {

  const {token, user} = useContext(AuthContext);
  const {property_id} = useParams();

  const [files,setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [reload,setReload] = useState(true);

  const handleChange = (e) => {
    const upFiles = Array.from(e.target.files);
    setNewFiles(upFiles);
  }

  const submitImg = async(file_type,admin_file) => {
    const newFormData = new FormData();

    if(files){
        for(const elem of newFiles) {
          newFormData.append("img", elem)
        }
      }

      //Aqui cambia el parametro si es una 1=imagen/2=plano/3=archivo
      newFormData.append("file_type", file_type);
      //Aqui cambia el parametro si es admin=true colaborador=false
      newFormData.append("admin_file", admin_file)

    try {

      const res = await fetchData(`/admin/postImg/${property_id}`, "POST", newFormData, token);
      setReload(!reload);
      
      
    } catch (error) {
      console.log(error);
    }

    //
  }

  const deleteImg = async(file_id, filename) => {
    const data = { file_id, property_id, filename };
    
    try {
      const res = await fetchData("/admin/delImg", "POST", data, token);
      setReload(!reload);
      

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const getFiles = async() => {
      try {
        const res = await fetchData(`/admin/getFiles/${property_id}`,"GET", null, token);
        
        setFiles(res.data.files);
        
      } catch (error) {
        console.log("Error al traer los archivos", error)
      }
    }
    getFiles();

  },[property_id, reload]);


  return (
   <div>
     <div className="bg-form d-flex flex-column  align-items-center py-5">
        <h2 className="text-white">Administrar propiedades</h2>
        <div className="line-title-white mb-5"></div>
      
      
      <div>
        <section className='p-3 form-container'>
          <h2>Imágenes</h2>
          <div className='d-flex flex-wrap'>
            {files.map((elem, index)=>{
              if (elem.file_type === 1){
              return (
              <div className='card-file'>
                <Card key={index}  >
                  <img src={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${elem.filename}`} />
                  <div className='buttons-file'>
                    <a href={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${elem.filename}`} download={`elem.filename`} className='fs-3'><i class="bi bi-cloud-arrow-down-fill"></i></a>
                    {(user.user_type !== 2 || !elem.admin_file) &&
                      <a onClick={()=>{deleteImg(elem.file_id, elem.filename)}} className='fs-3'><i class="bi bi-trash3-fill"></i></a>}
                  </div>
                </Card>
              </div>)
              }
            })}
          </div>
          <div className='d-flex justify-content-center pt-4'>
            <Form className='d-flex align-items-center gap-3'>
              <Form.Group controlId='formImg'>
                <Form.Label className='m-0 fs-3 text-primary'><i class="bi bi-file-earmark-arrow-up-fill"></i></Form.Label>
                <Form.Control type='file' name="img" multiple hidden onChange={handleChange}></Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" className='m-0' onClick={()=>submitImg(1,0)}>
              Subir
            </Button>
            </Form>
          </div>
        </section>
        <section className='p-3 mt-5 form-container'>
          <h2>Planos</h2>
          <div className='d-flex flex-wrap'>
            {files.map((elem, index)=>{
              if (elem.file_type === 2){
              return (
              <div className='card-file'>
                <Card key={index}  >
                  <img src={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${elem.filename}`} />
                  <div className='buttons-file'>
                    <a href={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${elem.filename}`} download={`elem.filename`} className='fs-3'><i class="bi bi-cloud-arrow-down-fill"></i></a>
                    {(user.user_type !== 2 || !elem.admin_file) &&
                    <a onClick={()=>{deleteImg(elem.file_id, elem.filename)}} className='fs-3'><i class="bi bi-trash3-fill"></i></a>}
                  </div>
                </Card>
              </div>)
              }
            })}
          </div>
          <div className='d-flex justify-content-center pt-4'>
            <Form className='d-flex align-items-center gap-3'>
              <Form.Group controlId='formImg'>
                <Form.Label className='m-0 fs-3 text-primary'><i class="bi bi-file-earmark-arrow-up-fill"></i></Form.Label>
                <Form.Control type='file' name="img" multiple hidden onChange={handleChange}></Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" className='m-0' onClick={()=>submitImg(2,0)}>
              Subir
            </Button>
            </Form>
          </div>
        </section>
        <section className='p-3 mt-5 form-container'>
          <h2>Archivos</h2>
          <div className='d-flex flex-column card-archives'>
            {files.map((elem, index)=>{
              if (elem.file_type === 3){
              return (
              <div key={index} className={`d-flex justify-content-between align-items-center p-3 ${index%2?"":"bg-primary-color"}`}>
                  <div>{elem.filename.split("-")[2]}</div>
                  <div>
                    <a href={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${elem.filename}`} download={`elem.filename`} className='fs-3 pe-3'><i class="bi bi-cloud-arrow-down-fill"></i></a>
                    {(user.user_type !== 2 || !elem.admin_file) &&
                    <a onClick={()=>{deleteImg(elem.file_id, elem.filename)}} className='fs-3 pe-3'><i class="bi bi-trash3-fill"></i></a>}
                  </div>
              </div>)
              }
            })}
          </div>
          <div className='d-flex justify-content-center pt-4'>
            <Form className='d-flex align-items-center gap-3'>
              <Form.Group controlId='formImg'>
                <Form.Label className='m-0 fs-3 text-primary'><i class="bi bi-file-earmark-arrow-up-fill"></i></Form.Label>
                <Form.Control type='file' name="img" multiple hidden onChange={handleChange}></Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" className='m-0' onClick={()=>submitImg(3,0)}>
              Subir
            </Button>
            </Form>
          </div>
        </section>
      </div>
      </div>
   </div>
  )
}
