import { Col, Container, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import './cardMyproperties.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';

export const CardMyproperties = ({ property }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [file,setFile] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const normalizeProperty = {
    ...property,
    is_reserved: Boolean(property.is_reserved)
  }

  const handleOnClick = () => {
    if (!user) {
      navigate(`/infoVivienda/${property.property_id}`);
    } else if (user.user_type === 1 || user.user_type === 0) {
      navigate(`/admin/infoVivienda/${property.property_id}`);
    } else {
      navigate(`/user/infoVivienda/${property.property_id}`);
    }
  };

  useEffect(()=>{
      const getFile = async() => {
        try {
          const res = await fetchData(`/admin/getFile/${property.property_id}`,"GET", null);
          setFile(res.data.file[0]);
  
        } catch (error) {
          console.log("Error al traer los archivos", error)
        }
      }
  
      getFile();
  
    },[]);

  return (
    <Container>
      <Row lg={3}>
        <Col lg={12}>
          <div className="card-MyProperties d-flex mt-4">
            <Col xl={4} lg={5} md={6}>
              <div className="card-image">
                {file ? 
                  <img
                    src={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${file.filename}`}
                    alt=""
                    onClick={handleOnClick}
                  />
                  :
                  <img
                    src='/images/bg/bg-Home.jpg'
                    alt=""
                    onClick={handleOnClick}
                  />
                }
                <div
                  className={
                    normalizeProperty.is_reserved == 0
                      ? 'card-price-blue d-flex flex-column gap-2'
                      : 'card-price-red d-flex flex-column gap-2'
                  }
                  onClick={handleOnClick}
                >
                  <p>
                    {normalizeProperty.is_reserved && "RESERVADO"}
                    {!normalizeProperty.is_reserved &&
                      normalizeProperty.property_type=== 2 && "EN VENTA"
                    }
                    {!normalizeProperty.is_reserved &&
                      normalizeProperty.property_type=== 3 && "ALQUILER"
                    }
                    {!normalizeProperty.is_reserved &&
                      normalizeProperty.property_type=== 4 && "OBRA NUEVA"
                    }
                  </p>
                  {normalizeProperty.price_hidden ?
                    <p>
                    {Number(normalizeProperty.price).toLocaleString('es-ES', {
                      useGrouping: true
                    })} €
                    </p>
                    :
                    ('')
                  }
                </div>
              </div>
            </Col>
            <Col xl={6} lg={4} md={4}>
              <div className="card-body d-flex flex-column p-3 gap-3 justify-content-center flex-wrap">
                <p className="fw-bolder">{property.title}</p>
                <p>
                  <span>Dirección: </span>
                  {property.type_via} {property.street_name}
                </p>
                <p>
                  <span>Localidad: </span>
                  {property.locality}
                </p>
              </div>
            </Col>
            <Col sm={2}>
              <div className="buttons-myProperties py-3 d-flex flex-column align-items-center justify-content-center gap-3">
                <button className="btn-1" onClick={handleOnClick}>
                  Ver más
                </button>
                <button
                  className="btn-1"
                  onClick={() =>
                    navigate(
                      `/user/editPropierties/${property.property_id}`
                    )
                  }
                >
                  Administrar
                </button>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
