import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import './myFavoritesHouses.css';
import { CardVivienda } from '../../../components/Card/CardVivienda/CardVivienda';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export const MyFavoritesHouses = () => {
  const { properties } = useContext(AuthContext);
  const [likedHouses, setLikedHouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const likedlocal = localStorage.getItem('favoritos');
    const likedIds = likedlocal ? JSON.parse(likedlocal) : [];
    const filtered = properties.filter((elem) =>
      likedIds.includes(elem.property_id)
    );
    setLikedHouses(filtered);
  }, [properties]);

  return (
    <section className="section-myfavourites py-5">
      <Container>
        <div className="d-flex flex-column align-items-center mb-4 text-center">
          {likedHouses.length > 0 ? (
            <>
              <h2>
                Mis favoritos <i className="red bi bi-heart-fill"></i>
              </h2>
              <div className="line-title"></div>
            </>
          ) : (
            <>
              <h2>
                Mis favoritos{' '}
                <i className="bi bi-heartbreak-fill text-muted"></i>
              </h2>
              <div className="line-title"></div>
            </>
          )}
        </div>

        {likedHouses.length > 0 ? (
          <Row className="g-4 justify-content-center pt-4 ">
            {likedHouses.map((elem) => (
              <Col
                key={elem.property_id}
                lg={3}
                md={6}
                sm={12}
                className="d-flex justify-content-center p-0"
              >
                <CardVivienda property={elem} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="d-flex flex-column align-items-center text-center">
            <p className="fs-5 mb-3">
              No tienes ninguna propiedad marcada como favorito.
              <br />
              ¿Quieres encontrar tu propiedad perfecta?
            </p>
            <button
              className="btn-1 mt-2"
              onClick={() => navigate('/inmuebles')}
            >
              Buscar propiedad
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};
