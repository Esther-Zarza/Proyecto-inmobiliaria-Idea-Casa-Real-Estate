import React, { useEffect, useState } from 'react';
import { CardDestacada } from '../Card/CardDestacada/CardDestacada';
import { Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import './InmueblesDestacados.css';
import { fetchData } from '../../helpers/axiosHelper';
import { CardDestacadaPhone } from '../Card/CardDestacada/CardDestacadaPhone';

export const InmueblesDestacados = () => {
  const [properties, setProperties] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetchData('/getPropertiesHighlights', 'GET');

      if (res.data.properties) {
        setProperties(res.data.properties);
      }
    };
    fetchProperties();
  }, []);


  return isMobile ? (
    <div>
      <section className="highlighted-estates p-4">
        <div className="d-flex align-items-center flex-column pb-5">
          <h2>Inmuebles destacados</h2>
          <div className="line-title"></div>
        </div>
        <Container>
          <div>
            <Row lg={2} className="gap-5">
              {properties.map((elem) => {
                return (
                  <CardDestacadaPhone key={elem.property_id} property={elem} />
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
    </div>
  ) : (
    <div>
      <section className="highlighted-estates p-5">
        <div className="d-flex align-items-center flex-column pb-5">
          <h2>Inmuebles destacados</h2>
          <div className="line-title"></div>
        </div>
        <Container>
          <div className="cards-highlights">
            <Row lg={2}>
              {properties.map((elem) => {

                return <CardDestacada key={elem.property_id} property={elem} />;

              })}
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
};
