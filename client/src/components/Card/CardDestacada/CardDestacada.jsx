import React, { useContext, useEffect, useState } from 'react'
import './CardDestacada.css'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaBed, FaShower, FaBuilding, FaRulerCombined, FaArrowUp } from "react-icons/fa";
import { AuthContext } from '../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../CardVivienda/components/InfoCard';
import { fetchData } from '../../../helpers/axiosHelper';


export const CardDestacada = ({property}) => { /* MODIFICAR */
  const {user, favourites, handleFavourite} = useContext(AuthContext);
  const isFavourite = favourites.includes(property.property_id);
  const navigate = useNavigate();

  const [file,setFile] = useState({});

  const normalizeProperty = {
    ...property,
    is_reserved: Boolean(property.is_reserved)
  }
  
  const handleOnClick = () => {
    if(!user){
      navigate(`/infoVivienda/${property.property_id}`);
    }else if(user.user_type === 1){
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
    <div>
      <div className='card-highlight d-flex mt-3'>
        <div className='card-image'>
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
            onClick={()=>handleFavourite(normalizeProperty.property_id)}
            className='fav-btn'
          >
            {isFavourite ? 
              <BsHeartFill className='full' />
              :
              <BsHeart className='empty' />
            }
          </button>
          <div 
            className={
              normalizeProperty.is_reserved ?
              'card-price-red d-flex flex-column gap-2'
              :
              'card-price-blue d-flex flex-column gap-2'
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
        <div className='card-body d-flex flex-column justify-content-center py-3'>
          <p 
            className='title-destacada'
            onClick={handleOnClick}
          >{normalizeProperty.title}
          </p>
          <div className='card-info d-flex flex-wrap gap-3 py-2'>
            <InfoCard property={normalizeProperty}/>
          </div>
          <p className='card-description'>{normalizeProperty.description}</p>
        </div>
      </div>
    </div>
  )
}
