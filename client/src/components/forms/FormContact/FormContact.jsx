import React, { useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';
import { formularioContactoSchema } from '../../../schemas/contactSchemas';
import { ModalsContact } from '../../modals/modalsContact/ModalsContact';
import './formContact.css';
import { Modalprivacity } from '../../modals/modalsFooter/Modalprivacity';

const initialValue = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  contactType: '',
  details: '',
  newsletter: false,
  politcy: false,
};

export const FormContact = () => {
  const [valErrors, setValErrors] = useState({});
  const [contact, setContact] = useState(initialValue);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      setContact({ ...contact, [name]: checked });
    } else {
      const { name, value } = e.target;
      setContact({ ...contact, [name]: value });
    }
  };

  const onSubmit = async () => {
    try {
      const validateContact = formularioContactoSchema.parse(contact);      
      await fetchData('/contact', 'POST', contact);

      setContact(initialValue);
      setValErrors('');
      setShowModalContact(true);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.issues.forEach((elem) => {
          fieldErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldErrors);
      } else {
        console.log('otro error', error);
      }
    }
  };

  return (
    <Container className="form-container form-mt py-4" id="formulariocontacto">
      <div className="text-center mb-4">
        <h3>Rellena nuestro formulario</h3>
        <p>Nos pondremos en contacto contigo lo antes posible</p>
      </div>
      
      <Form>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Label htmlFor="nameInput" className="fw-bold">Nombre *</Form.Label>
            <Form.Control
              type="text"
              id="nameInput"
              placeholder="Nombre"
              name="name"
              value={contact.name}
              onChange={handleChange}
            />
            {valErrors.name && <Form.Text className="text-danger">{valErrors.name}</Form.Text>}
          </Col>
          <Col xs={12} md={6}>
            <Form.Label htmlFor="lastNameInput" className="fw-bold input-mb">Apellidos</Form.Label>
            <Form.Control
              type="text"
              id="lastNameInput"
              placeholder="Apellidos"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
            />
            {valErrors.lastName && <Form.Text className="text-danger">{valErrors.lastName}</Form.Text>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Label htmlFor="emailInput" className="fw-bold">Email *</Form.Label>
            <Form.Control
              type="email"
              id="emailInput"
              placeholder="Email"
              name="email"
              value={contact.email}
              onChange={handleChange}
            />
            {valErrors.email && <Form.Text className="text-danger">{valErrors.email}</Form.Text>}
          </Col>
          <Col xs={12} md={6}>
            <Form.Label htmlFor="phoneInput" className="fw-bold input-mb">Teléfono *</Form.Label>
            <Form.Control
              type="phone"
              id="phoneInput"
              placeholder="Teléfono"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
            />
            {valErrors.phone && <Form.Text className="text-danger">{valErrors.phone}</Form.Text>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Label htmlFor="contactTypeInput" className="fw-bold">
              Tipo de servicio *
            </Form.Label>
            <Form.Select
              id="contactTypeInput"
              name="contactType"
              onChange={handleChange}
              value={contact.contactType}
            >
              <option disabled value="">
                Selecciona una opción
              </option>
              <option value="Buscar-Inmueble">Estoy buscando un inmueble</option>
              <option value="Venta/Alquiler">Quiero vender/alquilar mi inmueble</option>
              <option value="Otro">Otro</option>
            </Form.Select>
            {valErrors.contactType && (
              <Form.Text className="text-danger">{valErrors.contactType}</Form.Text>
            )}
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="detailsInput">
          <Form.Label className="fw-bold">Añadir detalles</Form.Label>
          <Form.Control
            as="textarea"
            name="details"
            rows={3}
            placeholder="¿Cómo podemos ayudarte?"
            value={contact.details}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3" controlId="checkbox1">
              <Form.Check
                type="checkbox"
                name="politcy"
                checked={contact.politcy}
                onChange={handleChange}
                label={
                  <>
                    Acepto que mis datos se gestionen de acuerdo con la{' '}
                    <span
                      onClick={() => setShowModal(true)}
                      style={{ color: '#0c4684ff', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Política de Privacidad
                    </span>{' '}
                    *
                  </>
                }
              />
              {showModal && <Modalprivacity setShowModalPrivacy={setShowModal} />}
              {valErrors.politcy && (
                <Form.Text className="text-danger">{valErrors.politcy}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group className="mb-3" controlId="checkbox2">
              <Form.Check
                label="Acepto recibir boletines, newsletter o comunicaciones comerciales de esta entidad"
                type="checkbox"
                name="newsletter"
                checked={contact.newsletter}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <button type="button" className="btn-1" onClick={onSubmit}>
            Enviar
          </button>
          {showModalContact && (
            <ModalsContact
              showModalContact={showModalContact}
              setShowModalContact={setShowModalContact}
            />
          )}
        </div>
      </Form>
    </Container>
  );
};
