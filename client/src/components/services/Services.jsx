import React, { useState } from 'react';
import './services.css';
import { dataServices } from '../../assets/dataServices.js';
import { Col, Container, Row } from 'react-bootstrap';
import { InfoServices } from './InfoServices';

export const Services = () => {
  const [info, setInfo] = useState(dataServices[0]);

  const handleInfo = (num) => {
    setInfo(dataServices.find((e) => e.id === num));
  };

  return (
    <div className="computer-view">
      <section className="section-services d-flex flex-column justify-content-center align-items-center py-5">
        <h2>Servicios</h2>
        <div className="line-title"></div>
        
        <Container>
          <Col xxl={12} className="d-flex gap-5 pt-5">
            <Col xxl={6} className="d-flex">
              <Row xxl={2}>
                <div className="div-img" onClick={() => handleInfo(1)}>
                  <img src="/images/services/ServicioFinanciacion.jpg" alt="" />
                  <div className="texto">
                    <span className="fw-medium text-white fs-5">
                      FINANCIACIÓN
                    </span>
                  </div>
                </div>
                <div className="div-img" onClick={() => handleInfo(2)}>
                  <img src="/images/services/ServiciohomeStaging.jpg" alt="" />
                  <div className="texto">
                    <span className="fw-medium  text-white fs-5">
                      HOME STAGING
                    </span>
                  </div>
                </div>
                <div className="div-img" onClick={() => handleInfo(3)}>
                  <img src="/images/services/ServicioGestoria.jpg" alt="" />
                  <div className="texto">
                    <span className="fw-medium  text-white fs-5">
                      GESTORÍA Y ASISTENCIA LEGAL
                    </span>
                  </div>
                </div>
                <div className="div-img" onClick={() => handleInfo(4)}>
                  <img src="/images/services/ServicioObras.jpg" alt="" />
                  <div className="texto">
                    <span className="fw-medium  text-white fs-5">
                      OBRAS Y REFORMAS
                    </span>
                  </div>
                </div>
                <div className="div-img" onClick={() => handleInfo(5)}>
                  <img src="/images/services/ServicioTasaciones.jpg" alt="" />
                  <div className="texto">
                    <span className="fw-medium  text-white fs-5">
                      TASACIONES
                    </span>
                  </div>
                </div>
                <div className="div-img" onClick={() => handleInfo(6)}>
                  <img src="/images/services/ServicioValoracion.jpg" alt="" />
                  <div className="texto">
                    <span className="fw-medium  text-white fs-5">
                      VALORACIÓN DE INMUEBLES
                    </span>
                  </div>
                </div>
              </Row>
            </Col>
            <Col xxl={6}>
              <InfoServices info={info} />
            </Col>
          </Col>
        </Container>
      </section>
    </div>
  );
};
