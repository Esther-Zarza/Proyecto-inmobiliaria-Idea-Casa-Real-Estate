import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { addEstateSchema } from '../../../schemas/formEditStateSchemas/addEstateSchema';
import './formCreate.css';
import { ModalCreate } from '../../modals/modalsCreatePropierties/ModalCreate';

const initialValue = {
  title: '',
  description: '',
  price: null,
  price_hidden: true,
  ibi: null,
  catastral_reference: '',
  registry_surface: null,
  year_built: null,
  property_type: null,
  is_public: false,
  is_highlighted: false,
  bedrooms: null,
  toilets: null,
  number_floors: null,
  keys_delivered: false,
  elevator: false,

  start_date: '' /* son de una tabla diferente */,
  end_date: '',

  private_observations: '',
};

export const FormCreate = () => {
  const { token } = useContext(AuthContext);
  const [addProperty, setAddProperty] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [showModalCreate, setShowModalCreate] = useState(false);

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      setAddProperty({ ...addProperty, [name]: checked });
    } else if (e.target.type === 'radio') {
      const { name, value } = e.target;
      setAddProperty({ ...addProperty, [name]: Number(value) });
    } else if (e.target.type === 'number') {
      const { name, value } = e.target;
      setAddProperty({
        ...addProperty,
        [name]: value === '' ? null : Number(value),
      });
    } else {
      const { name, value } = e.target;
      setAddProperty({ ...addProperty, [name]: value });
    }
  };

  const onSubmit = async () => {
    try {
      //validar
      const validatedData = addEstateSchema.parse(addProperty);
      

      //mandar al back
      const res = await fetchData(
        '/admin/addEstate',
        'POST',
        validatedData,
        token
      );
      

      setAddProperty(initialValue);
      setValErrors({});
      setShowModalCreate(true);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = {};

        error.issues.forEach((elem) => {
          fieldError[elem.path[0]] = elem.message;
        });

        setValErrors(fieldError);
      } else {
        console.log('Otro error', error);
      }
    }
  };

  return (
    <div>
      <Form className="form-container">
        <Row className="row-1">
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="titleInput" className="fw-bolder">
                Título del inmueble *
              </Form.Label>
              <Form.Control
                id="titleInput"
                placeholder="Título"
                name="title"
                value={addProperty.title}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors?.title && (
              <Form.Text className="text-danger">{valErrors.title}</Form.Text>
            )}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="descriptionInput" className="fw-bolder">
                Descripción *
              </Form.Label>
              <Form.Control
                id="descriptionInput"
                as="textarea"
                rows={6}
                placeholder="Descripción del inmueble"
                name="description"
                value={addProperty.description}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors?.description && (
              <Form.Text className="text-danger">
                {valErrors.description}
              </Form.Text>
            )}
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="priceInput" className="fw-bolder">
                    Precio
                  </Form.Label>
                  <Form.Control
                    id="priceInput"
                    placeholder="Precio"
                    name="price"
                    min="0"
                    type="number"
                    value={addProperty.price === null ? '' : addProperty.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.price && (
                  <Form.Text className="text-danger">
                    {valErrors.price}
                  </Form.Text>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                    name="price_hidden"
                    type="checkbox"
                    label="Mostrar precio en web"
                    checked={addProperty.price_hidden}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="ibiInput" className="fw-bolder">
                    IBI
                  </Form.Label>
                  <Form.Control
                    id="ibiInput"
                    placeholder="IBI"
                    name="ibi"
                    min="0"
                    type="number"
                    value={addProperty.ibi === null ? '' : addProperty.ibi}
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.ibi && (
                  <Form.Text className="text-danger">{valErrors.ibi}</Form.Text>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="refCatInput" className="fw-bolder">
                    Referencia Catastral
                  </Form.Label>
                  <Form.Control
                    id="refCatInput"
                    placeholder="Ref. Catastral"
                    name="catastral_reference"
                    value={addProperty.catastral_reference}
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.catastral_reference && (
                  <Form.Text className="text-danger">
                    {valErrors.catastral_reference}
                  </Form.Text>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="supRegInput" className="fw-bolder">
                    Superficie Registral
                  </Form.Label>
                  <Form.Control
                    id="supRegInput"
                    placeholder="Superficie Reg."
                    name="registry_surface"
                    min="0"
                    type="number"
                    value={
                      addProperty.registry_surface === null
                        ? ''
                        : addProperty.registry_surface
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.registry_surface && (
                  <Form.Text className="text-danger">
                    La superficie registral debe ser un número positivo con
                    hasta 2 decimales
                  </Form.Text>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  {' '}
                  {/* mejorar este campo */}
                  <Form.Label htmlFor="yearInput" className="fw-bolder">
                    Año de construcción
                  </Form.Label>
                  <Form.Control
                    id="yearInput"
                    placeholder="Año"
                    name="year_built"
                    min="0"
                    type="number"
                    value={
                      addProperty.year_built === null
                        ? ''
                        : addProperty.year_built
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.year_built && (
                  <Form.Text className="text-danger">
                    El año de construcción debe ser un año válido entre 1800 y
                    2099
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bolder">
                Tipo de operación/situación
              </Form.Label>
              <Row className="rounded border border-2 py-2 mb-1">
                <Col>
                  <Form.Check
                    id="radio1"
                    type="radio"
                    label="Valoración"
                    name="property_type"
                    value={1}
                    checked={addProperty.property_type === 1}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="rounded border border-2 py-2">
                <Col>
                  <Form.Check
                    id="radio2"
                    type="radio"
                    label="Venta"
                    name="property_type"
                    value={2}
                    checked={addProperty.property_type === 2}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    id="radio3"
                    type="radio"
                    label="Alquiler"
                    name="property_type"
                    value={3}
                    checked={addProperty.property_type === 3}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    id="radio4"
                    type="radio"
                    label="Obra nueva"
                    name="property_type"
                    value={4}
                    checked={addProperty.property_type === 4}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              {valErrors?.property_type && (
                <Form.Text className="text-danger">
                  {valErrors.property_type}
                </Form.Text>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                    id=""
                    type="checkbox"
                    label="Visible en web"
                    name="is_public"
                    checked={addProperty.is_public}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                    id=""
                    type="checkbox"
                    label="Destacado"
                    name="is_highlighted"
                    checked={addProperty.is_highlighted}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="bedroomInput" className="fw-bolder">
                    Habitaciones *
                  </Form.Label>
                  <Form.Control
                    id="bedrroomInput"
                    placeholder="Nº de habitaciones"
                    name="bedrooms"
                    min="0"
                    type="number"
                    value={
                      addProperty.bedrooms === null ? '' : addProperty.bedrooms
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.bedrooms && (
                  <Form.Text className="text-danger">
                    Introduce un número válido de habitaciones
                  </Form.Text>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="toiletInput" className="fw-bolder">
                    Baños *
                  </Form.Label>
                  <Form.Control
                    id="toiletInput"
                    placeholder="Nº de baños"
                    name="toilets"
                    min="0"
                    type="number"
                    value={
                      addProperty.toilets === null ? '' : addProperty.toilets
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.toilets && (
                  <Form.Text className="text-danger">
                    Introduce un número válido de baños
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="pb-3">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="numFloorsInput" className="fw-bolder">
                    Número de plantas / piso
                  </Form.Label>
                  <Form.Control
                    id="numFloorsInput"
                    placeholder="Nº de plantas / piso"
                    name="number_floors"
                    type="number"
                    value={
                      addProperty.number_floors === null
                        ? ''
                        : addProperty.number_floors
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.number_floors && (
                  <Form.Text className="text-danger">
                    Introduce un número válido
                  </Form.Text>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                    id=""
                    type="checkbox"
                    label="Llaves"
                    name="keys_delivered"
                    checked={addProperty.keys_delivered}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    id=""
                    type="checkbox"
                    label="Ascensor"
                    name="elevator"
                    checked={addProperty.elevator}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="pb-3">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="startDateInput" className="fw-bolder">
                    Fecha inicio
                  </Form.Label>
                  <Form.Control
                    id="startDateInput"
                    type="date"
                    placeholder=""
                    name="start_date"
                    value={addProperty.start_date}
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.start_date && (
                  <Form.Text className="text-danger">
                    {valErrors.start_date}
                  </Form.Text>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="endDateInput" className="fw-bolder">
                    Fecha fin
                  </Form.Label>
                  <Form.Control
                    id="endDateInput"
                    type="date"
                    placeholder=""
                    name="end_date"
                    value={addProperty.end_date}
                    onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.start_date && (
                  <Form.Text className="text-danger">
                    {valErrors.end_date}
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="obsPrivInput" className="fw-bolder">
                Observaciones privadas
              </Form.Label>
              <Form.Control
                id="obsPrivInput"
                as="textarea"
                rows={9}
                placeholder="Observaciones privadas"
                name="private_observations"
                value={addProperty.private_observations}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors?.private_observations && (
              <Form.Text className="text-danger">
                {valErrors.private_observations}
              </Form.Text>
            )}
          </Col>
        </Row>

        <div className="text-center">
          <button type="button" className="btn-1 " onClick={onSubmit}>
            Crear
          </button>
        </div>
        {showModalCreate && <ModalCreate />}
      </Form>
    </div>
  );
};
