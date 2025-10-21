import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { EditEnvironmentSchemas } from '../../../../schemas/formEditStateSchemas/EditEnvironmentSchemas';


const initialValue = {
  property_exterior: null,
  property_interior: null,
  interior_status: null,
  occupation_status: null,
  surroundings: null,
  type_neighbours_zone: null,
  type_neighbours_building: null,
  electricity_meter: null,
  water_meter: null,
  gas_meter: null,
};

export const FormEnvironment = () => {
  const { token } = useContext(AuthContext);
  const [editEnvironment, setEditEnvironment] = useState(initialValue);
  const [buttons, setButtons] = useState('');
  const { property_id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);  
  const [valErrors, setValErrors] = useState({});

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const res = await fetchData(
          `/admin/getEnvironment/${property_id}`,
          'GET',
          property_id,
          token
        );
        
        if (
          res.data &&
          res.data.environment &&
          res.data.environment.length > 0
        ) {
          setEditEnvironment(res.data.environment[0]);
          setButtons('edit');
        } else {
          setEditEnvironment(initialValue);
          setButtons('create');
        }
      } catch (error) {
        console.log('Error al cargar dirección', error);
      }
    };

    if (property_id) {
      fetchEnvironment();
    }
  }, [property_id]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);

    let numberFields = [
      'property_exterior',
      'property_interior',
      'interior_status',
      'occupation_status',
      'surroundings',
      'type_neighbours_zone',
      'type_neighbours_building',
      'water_meter',
      'gas_meter',
      'electricity_meter'
    ];

    if (numberFields.includes(name)) {
      value = parseInt(value);
    } else {
      value = value === 'true';
    }

    setEditEnvironment({ ...editEnvironment, [name]: value });
  };
  

  const onCreate = async () => {
    try {
      //validación
      EditEnvironmentSchemas.parse(editEnvironment);

      //back
      const result = await fetchData(
        `/admin/createEnvironment/${property_id}`,
        'POST',
        editEnvironment,
        token
      );
      

      setValErrors({});           
      setSuccessMessage('✅ Datos guardados correctamente');

      const resFetch = await fetchData(
        `/admin/getEnvironment/${property_id}`,
        'GET',
        property_id,
        token
      );

      
      if (
        resFetch.data &&
        resFetch.data.environment &&
        resFetch.data.environment.length > 0
      ) {
        setEditEnvironment(resFetch.data.environment[0]);
        setButtons('edit');
      }
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

  const onEdit = async () => {
    try {
      
      //validaciones
      EditEnvironmentSchemas.parse(editEnvironment);
    
      //mandar al back
      const res = await fetchData(
        `/admin/editEnvironment/${property_id}`,
        'PUT',
        editEnvironment,
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
    <Form className="form-container d-flex flex-column align-items-center">
      <Form.Group className="mb w-100">
        <Row className="g-4">
          <Col>
            <Form.Label htmlFor="propertyExterior" className="fw-bolder">
              Exteriores del inmueble
            </Form.Label>
            <Form.Select
              id="propertyExterior"
              name="property_exterior"
              value={editEnvironment.property_exterior ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.property_exterior === null
                  ? 'form-disabled'
                  : ''
              }
            >
              <option value="" disabled>
                Exteriores del inmueble
              </option>
              <option value="1">Nuevo</option>
              <option value="2">Seminuevo</option>
              <option value="3">Antiguo</option>
              <option value="4">Antiguo-deteriorado</option>
            </Form.Select>

            <Form.Label htmlFor="propertyInterior" className="pt-3 fw-bolder">
              Interiores del inmueble
            </Form.Label>
            <Form.Select
              id="propertyInterior"
              name="property_interior"
              value={editEnvironment.property_interior ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.property_interior === null
                  ? 'form-disabled'
                  : ''
              }
            >
              <option value="" disabled>
                Interiores del inmueble
              </option>
              <option value="1">Nuevo</option>
              <option value="2">Seminuevo</option>
              <option value="3">Antiguo</option>
              <option value="4">Antiguo-deteriorado</option>
            </Form.Select>
            <Form.Label htmlFor="interiorStatus" className="pt-3 fw-bolder">
              Estado del interior
            </Form.Label>
            <Form.Select
              id="interiorStatus"
              name="interior_status"
              value={editEnvironment.interior_status ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.interior_status === null ? 'form-disabled' : ''
              }
            >
              <option value="" disabled>
                Estado del inteior
              </option>
              <option value="1">Nuevo</option>
              <option value="2">Seminuevo</option>
              <option value="3">Antiguo</option>
              <option value="4">Limpio y cuidado</option>
              <option value="5">Limpio y descuidado</option>
              <option value="6">Deteriorado</option>
            </Form.Select>
            <Form.Label htmlFor="occupationStatus" className="pt-3 fw-bolder">
              Situación de ocupación del inmueble
            </Form.Label>
            <Form.Select
              id="occupationStatus"
              name="occupation_status"
              value={editEnvironment.occupation_status ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.occupation_status === null
                  ? 'form-disabled'
                  : ''
              }
            >
              <option value="" disabled>
                Situación de ocupación del inmueble
              </option>
              <option value="1">Está ocupado</option>
              <option value="2">Indicios de ocupación</option>
              <option value="3">Indicios de no ocupación</option>
              <option value="4">Propietario anterior</option>
              <option value="5">Inquilinos</option>
              <option value="6">Okupas</option>
            </Form.Select>
          </Col>
          <Col mt-0>
            <Form.Label htmlFor="surroundings" className="fw-bolder">
              Alrededores del inmueble
            </Form.Label>
            <Form.Select
              id="surroundings"
              name="surroundings"
              value={editEnvironment.surroundings ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.surroundings === null ? 'form-disabled' : ''
              }
            >
              <option value="" disabled>
                Alrededores del inmueble
              </option>
              <option value="1">Zona muy buena</option>
              <option value="2">Zona buena</option>
              <option value="3">Zona normal</option>
              <option value="4">Zona deprimida</option>
              <option value="5">Zona conflictiva</option>
              <option value="6">Zona okupas</option>
            </Form.Select>
            <Form.Label htmlFor="typeNeighboursZone" className="pt-3 fw-bolder">
              Tipo de vecinos de la zona
            </Form.Label>
            <Form.Select
              id="typeNeighboursZone"
              name="type_neighbours_zone"
              value={editEnvironment.type_neighbours_zone ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.type_neighbours_zone === null
                  ? 'form-disabled'
                  : ''
              }
            >
              <option value="" disabled>
                Tipo de vecinos de la zona
              </option>
              <option value="1">Alto</option>
              <option value="2">Medio</option>
              <option value="3">Bajo</option>
            </Form.Select>
            <Form.Label
              htmlFor="typeNeighboursBuilding"
              className="pt-3 fw-bolder"
            >
              Tipo de vecinos del edificio
            </Form.Label>
            <Form.Select
              id="typeNeighboursBuilding"
              name="type_neighbours_building"
              value={editEnvironment.type_neighbours_building ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.type_neighbours_building === null
                  ? 'form-disabled'
                  : ''
              }
            >
              <option value="" disabled>
                Tipo de vecinos del edificio
              </option>
              <option value="1">Alto</option>
              <option value="2">Medio</option>
              <option value="3">Bajo</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label htmlFor="electricityMeter" className="fw-bolder">
              Contador de luz
            </Form.Label>
            <Form.Select
              id="electricityMeter"
              name="electricity_meter"
              value={editEnvironment.electricity_meter ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.electricity_meter === null
                  ? 'form-disabled'
                  : ''
              }
            >
              <option value="" disabled>
                Si/No
              </option>
              <option value='1'>Si</option>
              <option value='0'>No</option>
            </Form.Select>
            <Form.Label htmlFor="waterMeter" className="pt-3 fw-bolder">
              Contador de agua
            </Form.Label>
            <Form.Select
              id="waterMeter"
              name="water_meter"
              value={editEnvironment.water_meter ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.water_meter === null ? 'form-disabled' : ''
              }
            >
              <option value="" disabled>
                Si/No
              </option>
              <option value='1'>Si</option>
              <option value='0'>No</option>
            </Form.Select>
            <Form.Label htmlFor="gasMeter" className="pt-3 fw-bolder">
              Contador de gas
            </Form.Label>
            <Form.Select
              id="gasMeter"
              name="gas_meter"
              value={editEnvironment.gas_meter ?? ''}
              onChange={handleChange}
              className={
                editEnvironment.gas_meter === null ? 'form-disabled' : ''
              }
            >
              <option value="" disabled>
                Si/No
              </option>
              <option value='1'>Si</option>
              <option value='0'>No</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    {buttons === 'create' ? (
          <div className="d-grid  d-lg-flex">
            <button
              type="button"
              className="btn-1 w-auto m-auto mt-3"
              onClick={onCreate}
            >
              Crear
            </button>
          </div>
        ) : (
          <div className="text-center w-100 mt-3">
            {successMessage && (
              <>
                <div className="alert alert-success text-center" role="alert">
                  {successMessage}
                </div>
                <button type="button" className="btn-2" onClick={onEdit}>
                  Guardar
                </button>
              </>
            )}

            {unsavedChanges && !successMessage && (
              <>
                <div className="alert alert-warning text-center" role="alert">
                  ⚠️ Hay cambios sin guardar
                </div>
                <button type="button" className="btn-1" onClick={onEdit}>
                  Guardar
                </button>
              </>
            )}
          </div>
        )}
    </Form>
  );
};
