import React, { useState } from 'react';
import './formAddAssessment.css'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { addAssessmentSchemas } from '../../../schemas/AddAssessmentSchemas';
import { fetchData } from '../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { ModalAssessment } from '../../modals/modalsAssesment/ModalAssessment';

const FormAddAssessment = () => {
  const initialState = {
    user_name: '',
    user_last_name: '',
    email: '',
    user_phone: '',
    bedrooms: '',
    toilets: '',
    catastral_reference: '',
    remodeled: false,
    type_via: '',
    street_name: '',
    street_number: '',
    block: '',
    stairs: '',
    floor: '',
    door: '',
    zip_code: '',
    city: '',
    municipality: '',
    locality: '',
    urbanization: '',
    street_observation: '',
  };

  const [addAssessment, setAddAssessment] = useState(initialState);
  const [valErrors, setValErrors] = useState({});
  const [showModalAssessment, setShowModalAssessment] = useState(false);

  

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    // Convertir a número si es input tipo number
    if (type === 'number') {
      newValue = value === '' ? '' : Number(value);
    }

    // Convertir a boolean si es remodeled
    if (name === 'remodeled') {
      newValue = value === 'true';
    }

    setAddAssessment({ ...addAssessment, [name]: newValue });
  };

  const onSubmit = async () => {
    try {
      //validaciones
      setValErrors({});
      const validateData = addAssessmentSchemas.parse(addAssessment);

      const res = await fetchData('/addAssessment', 'POST', validateData);
      

      setShowModalAssessment(true);
      setAddAssessment(initialState);
    } catch (error) {
      if (error instanceof ZodError) {
        const fileError = {};

        error.issues.forEach((elem) => {
          fileError[elem.path[0]] = elem.message;
        });

        setValErrors(fileError);
        
      } else {
        console.log('otro error', error);
      }
    }
  };

  const reset = () => {
    setValErrors({});
    setAddAssessment(initialState);
  };

  return (
    <Container>
      <div className="text-center p-5 text-white">
        <h2>Solicitud valoración</h2>
        <div className="line-title-white m-auto"></div>
      </div>

      <Form className="form-container">
        <Row>
          
          <Col xs={12} md={11} lg={6} className="mx-auto">
            <h3>Datos personales</h3>
            <Row>
              <Col md={6} lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nameInput" className='fw-bold'>Nombre *</Form.Label>
                  <Form.Control
                    id="nameInput"
                    placeholder="Nombre"
                    name="user_name"
                    value={addAssessment.user_name}
                    onChange={handleChange}
                  />
                  {valErrors.user_name && (
                    <p className="text-danger">{valErrors.user_name}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="lastNameInput" className='fw-bold'>Apellidos *</Form.Label>
                  <Form.Control
                    id="lastNameInput"
                    placeholder="Apellidos"
                    name="user_last_name"
                    value={addAssessment.user_last_name}
                    onChange={handleChange}
                  />
                  {valErrors.user_last_name && (
                    <p className="text-danger">{valErrors.user_last_name}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="emailInput" className='fw-bold'>Email *</Form.Label>
                  <Form.Control
                    id="emailInput"
                    placeholder="Email"
                    name="email"
                    value={addAssessment.email}
                    onChange={handleChange}
                  />
                  {valErrors.email && (
                    <p className="text-danger">{valErrors.email}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="phoneInput" className='fw-bold'>
                    Teléfono de contacto *
                  </Form.Label>
                  <Form.Control
                    id="phoneInput"
                    placeholder="Teléfono"
                    name="user_phone"
                    value={addAssessment.user_phone}
                    onChange={handleChange}
                  />
                  {valErrors.user_phone && (
                    <p className="text-danger">{valErrors.user_phone}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <h3>Datos necesarios</h3>
            <Row>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="bedroomsInput" className='fw-bold'>
                    Habitaciones *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="bedroomsInput"
                    placeholder="Nº de habitaciones"
                    name="bedrooms"
                    value={addAssessment.bedrooms}
                    onChange={handleChange}
                  />
                  {valErrors.bedrooms && (
                    <p className="text-danger">{valErrors.bedrooms}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="toiletsInput" className='fw-bold'>Baños *</Form.Label>
                  <Form.Control
                    type="number"
                    id="toiletsInput"
                    placeholder="Nº de baños"
                    name="toilets"
                    value={addAssessment.toilets}
                    onChange={handleChange}
                  />
                  {valErrors.toilets && (
                    <p className="text-danger">{valErrors.toilets}</p>
                  )}
                </Form.Group>
              </Col>

              <Col  md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="catastralReferenceInput" className='fw-bold'>
                    Referencia Catastral
                  </Form.Label>
                  <Form.Control
                    id="catastralReferenceInput"
                    placeholder="Referencia catastral"
                    name="catastral_reference"
                    value={addAssessment.catastral_reference}
                    onChange={handleChange}
                  />
                  {valErrors.catastral_reference && (
                    <p className="text-danger">
                      {valErrors.catastral_reference}
                    </p>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="remodeledInput" className='fw-bold'>Reformado *</Form.Label>
                  <Form.Select
                    id="remodeledInput"
                    name="remodeled"
                    value={addAssessment.remodeled}
                    onChange={handleChange}
                  >
                    <option value={true}>Sí</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          
          <Col xs={12} md={11} lg={6} className="mx-auto">
            <h3>Dirección</h3>
            <Row>
              <Col md={3} lg={3}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="typeViaInput" className='fw-bold'>Tipo de vía *</Form.Label>
                  <Form.Control
                    id="typeViaInput"
                    placeholder="Calle, plaza..."
                    name="type_via"
                    value={addAssessment.type_via}
                    onChange={handleChange}
                  />
                  {valErrors.type_via && (
                    <p className="text-danger">{valErrors.type_via}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={7} lg={9}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="streetNameInput" className='fw-bold'>
                    Nombre de vía *
                  </Form.Label>
                  <Form.Control
                    id="streetNameInput"
                    placeholder="Nombre"
                    name="street_name"
                    value={addAssessment.street_name}
                    onChange={handleChange}
                  />
                  {valErrors.street_name && (
                    <p className="text-danger">{valErrors.street_name}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={2} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="streetNumberInput" className='fw-bold'>Número *</Form.Label>
                  <Form.Control                    
                    id="streetNumberInput"
                    placeholder="Núm"
                    name="street_number"
                    value={addAssessment.street_number}
                    onChange={handleChange}
                  />
                  {valErrors.street_number && (
                    <p className="text-danger">{valErrors.street_number}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={2} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="blockInput" className='fw-bold'>Bloque</Form.Label>
                  <Form.Control
                    id="blockInput"
                    placeholder="Bloque"
                    name="block"
                    value={addAssessment.block}
                    onChange={handleChange}
                  />
                  {valErrors.block && (
                    <p className="text-danger">{valErrors.block}</p>
                  )}                  
                </Form.Group>
              </Col>

              <Col md={2} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="stairsInput" className='fw-bold'>Escalera</Form.Label>
                  <Form.Control
                    id="stairsInput"
                    placeholder="Esc."
                    name="stairs"
                    value={addAssessment.stairs}
                    onChange={handleChange}
                  />
                  {valErrors.stairs && (
                    <p className="text-danger">{valErrors.stairs}</p>
                  )}                  
                </Form.Group>
              </Col>

              <Col md={2} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="floorInput" className='fw-bold'>Planta</Form.Label>
                  <Form.Control
                    id="floorInput"
                    placeholder="Planta"
                    name="floor"
                    value={addAssessment.floor}
                    onChange={handleChange}
                  />
                  {valErrors.floor && (
                    <p className="text-danger">{valErrors.floor}</p>
                  )}                  
                </Form.Group>
              </Col>

              <Col md={2} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="doorInput" className='fw-bold'>Puerta</Form.Label>
                  <Form.Control
                    id="doorInput"
                    placeholder="Puerta"
                    name="door"
                    value={addAssessment.door}
                    onChange={handleChange}
                  />
                  {valErrors.door && (
                    <p className="text-danger">{valErrors.door}</p>
                  )}                  
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={2} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="zipCodeInput" className='fw-bold'>C.P. *</Form.Label>
                  <Form.Control
                    id="zipCodeInput"
                    placeholder="C.P."
                    name="zip_code"
                    value={addAssessment.zip_code}
                    onChange={handleChange}
                  />
                  {valErrors.zip_code && (
                    <p className="text-danger">{valErrors.zip_code}</p>
                  )}                  
                </Form.Group>
              </Col>

              <Col md={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="cityInput" className='fw-bold'>Ciudad *</Form.Label>
                  <Form.Control
                    id="cityInput"
                    placeholder="Ciudad"
                    name="city"
                    value={addAssessment.city}
                    onChange={handleChange}
                  />
                  {valErrors.city && (
                    <p className="text-danger">{valErrors.city}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={4} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="municipalityInput" className='fw-bold'>
                    Municipio *
                  </Form.Label>
                  <Form.Control
                    id="municipalityInput"
                    placeholder="Municipio"
                    name="municipality"
                    value={addAssessment.municipality}
                    onChange={handleChange}
                  />
                  {valErrors.municipality && (
                    <p className="text-danger">{valErrors.municipality}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={5} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="localityInput" className='fw-bold'>Localidad *</Form.Label>
                  <Form.Control
                    id="localityInput"
                    placeholder="Localidad"
                    name="locality"
                    value={addAssessment.locality}
                    onChange={handleChange}
                  />
                  {valErrors.locality && (
                    <p className="text-danger">{valErrors.locality}</p>
                  )}
                </Form.Group>
              </Col>

              <Col md={5} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="urbanizationInput" className='fw-bold'>
                    Urbanización
                  </Form.Label>
                  <Form.Control
                    id="urbanizationInput"
                    placeholder="Urbanización"
                    name="urbanization"
                    value={addAssessment.urbanization}
                    onChange={handleChange}
                  />
                  {valErrors.urbanization && (
                    <p className="text-danger">{valErrors.urbanization}</p>
                  )}                  
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="streetObservationInput" className='fw-bold'>
                    Observaciones
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    id="streetObservationInput"
                    placeholder="Datos adicionales (máx 200 carácteres)"
                    name="street_observation"
                    value={addAssessment.street_observation}
                    onChange={handleChange}
                  />
                  {valErrors.street_observation && (
                    <p className="text-danger">{valErrors.street_observation}</p>
                  )}                  
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>

        
        <Row className="mt-3">
          <Col xs={6} md={6} lg={6}>
            <div className="d-grid  d-lg-flex justify-content-end">
              <div>
                <button
                  type="button"
                  className="btn-2"
                  onClick={reset}
                >
                  Limpiar
                </button>
              </div>
         
              
            </div>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <div className="d-grid  d-lg-flex justify-content-start">         
              <button
                type="button"
                className='btn-1'
                onClick={onSubmit}
                
              >
                Enviar
              </button>
              {showModalAssessment && <ModalAssessment /> }
            </div>
          </Col>
          
        </Row>
      </Form>
    </Container>
  );
};

export default FormAddAssessment;
