import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { editAddressSchema } from '../../../../schemas/formEditStateSchemas/editAddressSchema';

export const FormAddress = () => {
  const { token } = useContext(AuthContext);
  const [editAddress, setEditAddress] = useState({});
  const [valErrors, setValErrors] = useState({});
  const { property_id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetchData(
          `/admin/getAddress/${property_id}`,
          'GET',
          property_id,
          token
        );

        
        if (res.data && res.data.address) {
          setEditAddress(res.data.address[0]);
        }
      } catch (error) {
        console.log('Error al cargar dirección', error);
      }
    };
    if (property_id) {
      fetchAddress();
    }
  }, [property_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);

    setEditAddress({ ...editAddress, [name]: value });
  };

  const onSubmit = async () => {
    try {
      //validaciones
      editAddressSchema.parse(editAddress);

      //mandar al back
      const res = await fetchData(
        `/admin/editAddress/${property_id}`,
        'PUT',
        editAddress,
        token
      );
      

      setValErrors({});
      setUnsavedChanges(false);
      setSuccessMessage('✅ Datos guardados correctamente');

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
    <div className="mb-5">
      <Form className="form-container">
        <Row>
          <Col xs="auto">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="typeViaInput" className="fw-bolder">
                Tipo de vía *
              </Form.Label>
              <Form.Control
                id="typeViaInput"
                placeholder="Calle, plaza..."
                name="type_via"
                value={editAddress.type_via ?? ''}
                onChange={handleChange}
              />
              {valErrors.type_via && (
                <p className="text-danger">{valErrors.type_via}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="streetNameInput" className="fw-bolder">
                Nombre de vía *
              </Form.Label>
              <Form.Control
                id="streetNameInput"
                placeholder="Nombre"
                name="street_name"
                value={editAddress.street_name ?? ''}
                onChange={handleChange}
              />
              {valErrors.street_name && (
                <p className="text-danger">{valErrors.street_name}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="streetNumberInput" className="fw-bolder">
                Número *
              </Form.Label>
              <Form.Control
                id="streetNumberInput"
                placeholder="Núm"
                name="street_number"
                value={editAddress.street_number ?? ''}
                onChange={handleChange}
              />
              {valErrors.street_number && (
                <p className="text-danger">{valErrors.street_number}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="blockInput" className="fw-bolder">
                Bloque
              </Form.Label>
              <Form.Control
                id="blockInput"
                placeholder="Bloque"
                name="block"
                value={editAddress.block ?? ''}
                onChange={handleChange}
              />
              {valErrors.block && (
                <p className="text-danger">{valErrors.block}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="stairsInput" className="fw-bolder">
                Escalera
              </Form.Label>
              <Form.Control
                id="stairsInput"
                placeholder="Esc."
                name="stairs"
                value={editAddress.stairs ?? ''}
                onChange={handleChange}
              />
              {valErrors.block && (
                <p className="text-danger">{valErrors.block}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="floorInput" className="fw-bolder">
                Planta
              </Form.Label>
              <Form.Control
                id="floorInput"
                placeholder="Planta"
                name="floor"
                value={editAddress.floor ?? ''}
                onChange={handleChange}
              />
              {valErrors.floor && (
                <p className="text-danger">{valErrors.floor}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="doorInput" className="fw-bolder">
                Puerta
              </Form.Label>
              <Form.Control
                id="doorInput"
                placeholder="Puerta"
                name="door"
                value={editAddress.door ?? ''}
                onChange={handleChange}
              />
              {valErrors.door && (
                <p className="text-danger">{valErrors.door}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="zipCodeInput" className="fw-bolder">
                C.P. *
              </Form.Label>
              <Form.Control
                id="zipCodeInput"
                placeholder="C.P."
                name="zip_code"
                value={editAddress.zip_code ?? ''}
                onChange={handleChange}
              />
              {valErrors.zip_code && (
                <p className="text-danger">{valErrors.zip_code}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="cityInput" className="fw-bolder">
                Ciudad *
              </Form.Label>
              <Form.Control
                id="cityInput"
                placeholder="Ciudad"
                name="city"
                value={editAddress.city ?? ''}
                onChange={handleChange}
              />
              {valErrors.city && (
                <p className="text-danger">{valErrors.city}</p>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="municipalityInput" className="fw-bolder">
                Municipio *
              </Form.Label>
              <Form.Control
                id="municipalityInput"
                placeholder="Municipio"
                name="municipality"
                value={editAddress.municipality ?? ''}
                onChange={handleChange}
              />
              {valErrors.municipality && (
                <p className="text-danger">{valErrors.municipality}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="localityInput" className="fw-bolder">
                Localidad *
              </Form.Label>
              <Form.Control
                id="localityInput"
                placeholder="Localidad / pedanía"
                name="locality"
                value={editAddress.locality ?? ''}
                onChange={handleChange}
              />
              {valErrors.locality && (
                <p className="text-danger">{valErrors.locality}</p>
              )}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="urbanizationInput" className="fw-bolder">
                Urbanización
              </Form.Label>
              <Form.Control
                id="urbanizationInput"
                placeholder="Urbanización"
                name="urbanization"
                value={editAddress.urbanization ?? ''}
                onChange={handleChange}
              />
              {valErrors.urbanization && (
                <p className="text-danger">{valErrors.urbanization}</p>
              )}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="neighbourhoodInput" className="fw-bolder">
                Barriada
              </Form.Label>
              <Form.Control
                id="neighbourhoodInput"
                placeholder="Barriada"
                name="neighbourhood"
                value={editAddress.neighbourhood ?? ''}
                onChange={handleChange}
              />
              {valErrors.neighbourhood && (
                <p className="text-danger">{valErrors.neighbourhood}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="streetObservationInput" className="fw-bolder">
            Observaciones
          </Form.Label>
          <Form.Control
            id="streetObservationInput"
            as="textarea"
            rows={6}
            placeholder="Datos adicionales (max. 200 carácteres)"
            name="street_observation"
            value={editAddress.street_observation ?? ''}
            onChange={handleChange}
          />
          {valErrors.street_observation && (
            <p className="text-danger">{valErrors.street_observation}</p>
          )}
        </Form.Group>

        <div className="text-center">
          {successMessage && (
            <>
              <div className="alert alert-success text-center" role="alert">
                {successMessage}
              </div>
              <button type="button" className="btn-2" onClick={onSubmit}>
                Guardar
              </button>
            </>
          )}

          {unsavedChanges && !successMessage && (
            <>
              <div className="alert alert-warning text-center" role="alert">
                ⚠️ Hay cambios sin guardar
              </div>
              <button type="button" className="btn-1" onClick={onSubmit}>
                Guardar
              </button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};
