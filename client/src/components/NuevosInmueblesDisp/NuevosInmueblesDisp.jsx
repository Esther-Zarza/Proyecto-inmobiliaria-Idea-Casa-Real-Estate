import { useEffect, useId, useState } from 'react';
import { CardVivienda } from '../Card/CardVivienda/CardVivienda';
import { Col, Container, Row } from 'react-bootstrap';
import './NuevosInmueblesDisp.css';
import { fetchData } from '../../helpers/axiosHelper';
import { CardViviendaPhone } from '../Card/CardVivienda/cardViviendaPhone';

export const NuevosInmueblesDisp = () => {
  const [properties, setProperties] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeButtons, setActiveButtons] = useState(0);
  const propertyId = useId();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetchData('/getPropertiesHome', 'GET');
      if (res.data.properties) {
        setProperties(res.data.properties);
      }
    };
    fetchProperties();
  }, []);


  return isMobile ? (
    
    <section className="new-estates-phone py-5">
      <div className="d-flex align-items-center flex-column pb-5">
        <h2>Nuevos inmuebles disponibles</h2>
        <div className="line-title"></div>
      </div>
      <Container>
        <div className="slider-wrapper">
          {properties.map((elem, index) => (
            <div
              key={index}
              className="slider-items"
              id={`${propertyId}-${elem.property_id}`}
            >
              <CardViviendaPhone key={elem.property_id} property={elem} />
            </div>
          ))}
        </div>
        <div className="buttons d-flex justify-content-center pt-2">
          {properties.map((elem, index) => (
            <a
              key={elem.property_id}
              href={`#${propertyId}-${elem.property_id}`}
              onClick={() => setActiveButtons(index)}
              className={activeButtons === index ? 'active-bg' : 'inactive-bg'}
            ></a>
          ))}
        </div>
      </Container>
    </section>
  ) : (
    
    <section className="new-estates-phone p-5">
      <div className="d-flex align-items-center flex-column pb-5">
        <h2>Nuevos inmuebles disponibles</h2>
        <div className="line-title"></div>
      </div>
      <Container>
      <Row className="justify-content-center g-4">
        {properties.map((elem) => (
          <Col sm={12} md={6} lg={3} key={elem.property_id}>
            <div className="justify-content-center">
              <CardVivienda property={elem} />
            </div>
          </Col>
        ))}
      </Row>
      </Container>
    </section>
  );
};
