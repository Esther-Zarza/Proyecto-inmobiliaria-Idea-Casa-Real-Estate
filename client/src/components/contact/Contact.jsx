import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormContact } from '../forms/FormContact/FormContact';
import { CardContact } from '../Card/cardContact/CardContact';


export const Contact = () => {
  return (
    <section className="section-form-contact py-5" id="formcontacto">
      <div className="d-flex flex-column align-items-center">
        <h2>Contacta con nosotros</h2>
        <div className="line-title"></div>
      </div>

      <Container>
        <Row>
          <Col md={12} lg={6} className="p-5 mb-3 ">
            <CardContact />
          </Col>
          <Col md={12} lg={6} className="p-5">
            <FormContact />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
