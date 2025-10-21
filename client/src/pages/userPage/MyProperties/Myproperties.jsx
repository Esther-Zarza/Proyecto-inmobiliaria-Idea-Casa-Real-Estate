import React, { useContext, useEffect, useState } from 'react';
import { CardMyproperties } from '../../../components/Card/Cardmyproperties/CardMyproperties';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { CardMypropertiesPhone } from '../../../components/Card/cardMyproperties/CardMypropertiesPhone';
import './myProperties.css'

export const Myproperties = () => {
  const { token, user } = useContext(AuthContext);
  const [misPropiedades, setMisPropiedades] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const misPropiedadesId = async () => {
      try {
        const res = await fetchData(
          `/user/getMyproperties/${user.user_id}`,
          'GET',
          null,
          token
        );
        setMisPropiedades(res.data.getMyproperties);
      } catch (error) {
        console.error('Error al cargar las propiedades del usuario:', error);
      }
    };

    misPropiedadesId();
  }, []);

  return isMobile ? (
    <div className="bg-form d-flex flex-column  align-items-center py-5">
      <h2 className="text-white">Mis propiedades</h2>
      <div className="line-title-white"></div>

      {misPropiedades?.length > 0 ? (
        misPropiedades.map((elem) => (
          <CardMypropertiesPhone key={elem.property_id} property={elem} />
        ))
      ) : (
        <p className='error-filter'>No tienes propiedades asignadas.</p>
      )}
    </div>
  ) : (
    <div className="bg-form d-flex flex-column  align-items-center py-5">
      <h2 className="text-white">Mis propiedades</h2>
      <div className="line-title-white"></div>

      {misPropiedades?.length > 0 ? (
        misPropiedades.map((elem) => (
          <CardMyproperties key={elem.property_id} property={elem} />
        ))
      ) : (
        <p className='error-filter'>No tienes propiedades asignadas.</p>
      )}
    </div>
  );
};
