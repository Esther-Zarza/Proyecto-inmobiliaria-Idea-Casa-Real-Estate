import React, { useContext, useEffect, useState } from 'react';
import './cardBusqueda.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../CardVivienda/components/InfoCard';
import ImageCarousel from "./carousel/ImageCarousel";
import { fetchData } from '../../../helpers/axiosHelper';

export const CardBusqueda = ({ property }) => {
  
  
  const { favourites, handleFavourite, user } = useContext(AuthContext);
  const isFavourite = favourites.includes(property.property_id);
  const navigate = useNavigate();

  const [file,setFile] = useState({});

  const handleOnClick = () => {
    if(!user){
      navigate(`/infoVivienda/${property.property_id}`);
    }else if(user.user_type === 1 || user.user_type === 0){
      navigate(`/admin/infoVivienda/${property.property_id}`);
    }else{
      navigate(`/user/infoVivienda/${property.property_id}`);
    }
  }

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
    
      <div className="card-search d-flex w-100">
         <div className="card-image" style={{ width: "30%", height: "100%" }}>
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
            property.is_reserved == 0 ?
              'card-price-blue d-flex flex-column gap-2'
              :
              'card-price-red d-flex flex-column gap-2'
          }
          onClick={handleOnClick}
        >
          <p>
            {Boolean(property.is_reserved) && "RESERVADO"}
            {Boolean(!property.is_reserved) &&
              property.property_type=== 2 && "EN VENTA"
            }
            {Boolean(!property.is_reserved) &&
              property.property_type=== 3 && "ALQUILER"
            }
            {Boolean(!property.is_reserved) &&
              property.property_type=== 4 && "OBRA NUEVA"
            }
          </p>
          <p>
            {Number(property.price).toLocaleString('es-ES', {
              useGrouping: true
            })} €
          </p>
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <button
          onClick={() => handleFavourite(property.property_id)}
          className="fav-btn"
        >
          {isFavourite ? <BsHeartFill className="full" /> : <BsHeart className="empty" />}
        </button>

        <p className="card-title" onClick={handleOnClick}>
          {property.title}
        </p>

        <p className="card-price">{Number(property.price).toLocaleString("es-ES")} €</p>

        <div className="card-info">
          <InfoCard property={property} />
          <p className="card-description">{property.description}</p>
        </div>
        {(user?.user_type === 1 || user?.user_type === 0) &&
          <button
            className='btn-1 btn-edit my-3'
            onClick={()=>navigate(`/admin/editEstate/${property.property_id}`)}>
            Editar
          </button>
          // BOTÓN POR SI ES ADMIN PARA IR DIRECTO A EDITAR LA PROPIEDAD
        }
      </div>
    </div>
  );
};