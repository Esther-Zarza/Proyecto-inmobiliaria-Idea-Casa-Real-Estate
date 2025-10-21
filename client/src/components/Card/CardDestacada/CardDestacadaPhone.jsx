import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cardDestacadaPhone.css';
import 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AuthContext } from '../../../context/AuthContextProvider';
import InfoCard from '../CardVivienda/components/InfoCard';
import { fetchData } from '../../../helpers/axiosHelper';

export const CardDestacadaPhone = ({ property }) => {
  /* MODIFICAR */
  const { user, favourites, handleFavourite } = useContext(AuthContext);
  const isFavourite = favourites.includes(property?.property_id);
  const navigate = useNavigate();

  const [file,setFile] = useState({});

  const normalizeProperty = {
    ...property,
    is_reserved: Boolean(property.is_reserved)
  }

  const handleOnClick = () => {
    if (!user) {
      navigate(`/infoVivienda/${property?.property_id}`);
    } else if (user.user_type === 1 || user.user_type === 0) {
      navigate(`/admin/infoVivienda/${property?.property_id}`);
    } else {
      navigate(`/user/infoVivienda/${property?.property_id}`);
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
    <>
      <div className="card-highlight-phone d-flex flex-column">
        <div className="card-image-phone">
          {file ? 
          <img
          // src={`${import.meta.env.VITE_SERVER_IMAGES}/poperty`}
          src={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${file.filename}`}
          alt=""
          onClick={handleOnClick}
        />
        :
          <img
          // src={`${import.meta.env.VITE_SERVER_IMAGES}/poperty`}
          src='/images/bg/bg-Home.jpg'
          alt=""
          onClick={handleOnClick}
        />}
          <button
            onClick={() => handleFavourite(property?.property_id)}
            className="fav-btn"
          >
            {isFavourite ? (
              <BsHeartFill className="full" />
            ) : (
              <BsHeart className="empty" />
            )}
          </button>
          {/* HAY QUE AÑADIR NUEVO CAMPO EN DB -> RESERVADO */}
          <div
            className={
              normalizeProperty?.is_reserved == 0
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
          <div className="card-info d-flex justify-content-center text-center">
            <InfoCard property={property} />
          </div>
        </div>
        <div className="d-flex  flex-column justify-content-center align-items-center py-3">
          <p className="card-title" onClick={handleOnClick}>
            {property?.title}
          </p>
          <p className="card-decripcion-phone" onClick={handleOnClick}>
            {property?.description}
          </p>
        </div>
      </div>
    </>
  );
};
