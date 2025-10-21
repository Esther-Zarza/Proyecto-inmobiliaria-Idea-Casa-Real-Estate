import React, { useState } from 'react';
import './servicesPhone.css';
import { dataServices } from '../../assets/dataServices';
import { Col, Container, Row } from 'react-bootstrap';
import { InfoServices } from './InfoServices';

export const ServicesPhone = () => {
  const [info, setInfo] = useState(dataServices[0]);

  const handleInfo = (num) => {
    setInfo(dataServices.find((e) => e.id === num));
  };

  return (
    <div className='mobile-view'>
      <section className="section-services-phone px-5 ">
        <div className="d-flex flex-column align-items-center">
          <h2 className="line-title mb-4">Servicios</h2>
        </div>
        <Col xxl={12} className="justify-content-center">
          <div className="slider">
            <div className="images">
              <div id="financiacion" className="div-img-phone" onClick={() => handleInfo(1)}>
                <img src="/images/services/ServicioFinanciacion.jpg" alt="" />                
              </div>
              <div id="homeStaging" className="div-img-phone" onClick={() => handleInfo(2)}>
                <img src="/images/services/ServiciohomeStaging.jpg" alt="" />        
              </div>
              <div id="gestoriayAsistenciaLegal" className="div-img-phone" onClick={() => handleInfo(3)}>
                <img src="/images/services/ServicioGestoria.jpg" alt="" />        
              </div>
              <div id="obrasyReformas" className="div-img-phone" onClick={() => handleInfo(4)}>
                <img src="/images/services/ServicioObras.jpg" alt="" />                
              </div>
              <div id="tasaciones" className="div-img-phone" onClick={() => handleInfo(5)}>
                <img src="/images/services/ServicioTasaciones.jpg" alt="" />          
              </div>
              <div id="valoracionInmuebles" className="div-img-phone" onClick={() => handleInfo(6)}>
                <img src="/images/services/ServicioValoracion.jpg" alt="" />           
              </div>
            </div>
            <div className="buttons d-flex justify-content-center pt-2">
              <a
                href="#financiacion"
                className={info === dataServices[0] ? 'active-bg' : 'inactive-bg'}
                onClick={() => handleInfo(1)}
              ></a>
              <a
                href="#homeStaging"
                className={info === dataServices[1] ? 'active-bg' : 'inactive-bg'}
                onClick={() => handleInfo(2)}
              ></a>
              <a
                href="#gestoriayAsistenciaLegal"
                className={info === dataServices[2] ? 'active-bg' : 'inactive-bg'}
                onClick={() => handleInfo(3)}
              ></a>
              <a
                href="#obrasyReformas"
                className={info === dataServices[3] ? 'active-bg' : 'inactive-bg'}
                onClick={() => handleInfo(4)}
              ></a>
              <a
                href="#tasaciones"
                className={info === dataServices[4] ? 'active-bg' : 'inactive-bg'}
                onClick={() => handleInfo(5)}
              ></a>
              <a
                href="#valoracionInmuebles"
                className={info === dataServices[5] ? 'active-bg' : 'inactive-bg'}
                onClick={() => handleInfo(6)}
              ></a>
            </div>
          </div>
        </Col>
        <Col xxl={12}>
          <InfoServices info={info} />
        </Col>
      </section>
    </div>
  );
};
