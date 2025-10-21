import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import './cardMypropertiesPhone.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';

export const CardMypropertiesPhone = ({ property }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [file,setFile] = useState({});

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
      <div className="card-MyProperties-phone d-flex mt-4">
        <div className="card-image d-flex flex-column">
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
        <div className="address-edit d-flex flex-column justify-content-center align-items-center text-center">
          <div className='ms-1'>
            <p className="fw-bolder">{property.title}</p>
            <p>{property.type_via} {property.street_name}</p>
            <p>{property.municipality}</p>
          </div>

          <div className="d-flex flex-column gap-2">
            <button className="btn-1" onClick={handleOnClick}>
              Ver más
            </button>
            <button
              className="btn-1"
              onClick={() =>
                navigate(`/user/editPropierties/${property.property_id}`)
              }
            >
              Administrar
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
