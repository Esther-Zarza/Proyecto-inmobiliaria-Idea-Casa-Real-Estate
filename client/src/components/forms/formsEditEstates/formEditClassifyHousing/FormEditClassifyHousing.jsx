import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ZodError } from 'zod';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { editClassificationSchema } from '../../../../schemas/formEditStateSchemas/editClassificationSchema';

export const FormEditClassifyHousing = () => {
  const initialValue = {
    property_status: null,
    property_classification: null,
    agreement_type: null,
    energ_qualification: null,
    energ_certification: null,
    orientation: null,
    util_surface: null,
    garage_surface: null,
    terrace_surface: null,
    pool_surface: null,
  };

  const [editClassification, setEditClassification] = useState(initialValue);
  const { token } = useContext(AuthContext);
  const [buttons, setButtons] = useState('');
  const [valErrors, setValErrors] = useState({});
  const { property_id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);

    let numberFields = [
      'property_status',
      'property_classification',
      'agreement_type',
      'energ_qualification',
      'energ_certification',
      'orientation',
    ];

    if (numberFields.includes(name)) {
      value = parseInt(value);
    }

    setEditClassification({ ...editClassification, [name]: value });
  };

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const res = await fetchData(
          `/admin/getClassification/${property_id}`,
          'GET',
          property_id,
          token
        );

        

        if (
          res.data &&
          res.data.classification &&
          res.data.classification.length > 0
        ) {
          const classification = res.data.classification[0];

          const normalizeClassif = {
            ...classification,
            util_surface: classification.util_surface
              ? parseFloat(classification.util_surface.replace(',', '.'))
              : null,
            garage_surface: classification.garage_surface
              ? parseFloat(classification.garage_surface.replace(',', '.'))
              : null,
            terrace_surface: classification.terrace_surface
              ? parseFloat(classification.terrace_surface.replace(',', '.'))
              : null,
            pool_surface: classification.pool_surface
              ? parseFloat(classification.pool_surface.replace(',', '.'))
              : null,
          };

          setEditClassification(normalizeClassif);
          setButtons('edit');
        } else {
          setEditClassification(initialValue);
          setButtons('create');
        }
      } catch (error) {
        console.log('Error al cargar clasificación', error);
      }
    };

    if (property_id) {
      fetchClassification();
    }
  }, [property_id, token]);

  const onCreate = async () => {
    try {
      //validaciones
      editClassificationSchema.parse(editClassification);

      //mandar al back
      const res = await fetchData(
        `/admin/createClassification/${property_id}`,
        'POST',
        editClassification,
        token
      );
      

      setValErrors({});
      setSuccessMessage('✅ Datos guardados correctamente');

      // volvemos a llamar al GET para actualizar el form
      const reFetch = await fetchData(
        `/admin/getClassification/${property_id}`,
        'GET',
        property_id,
        token
      );

      if (
        reFetch.data &&
        reFetch.data.classification &&
        reFetch.data.classification.length > 0
      ) {
        const classification = reFetch.data.classification[0];

        const normalizeClassif = {
          ...classification,
          util_surface: classification.util_surface
            ? parseFloat(classification.util_surface.replace(',', '.'))
            : null,
          garage_surface: classification.garage_surface
            ? parseFloat(classification.garage_surface.replace(',', '.'))
            : null,
          terrace_surface: classification.terrace_surface
            ? parseFloat(classification.terrace_surface.replace(',', '.'))
            : null,
          pool_surface: classification.pool_surface
            ? parseFloat(classification.pool_surface.replace(',', '.'))
            : null,
        };

        setEditClassification(normalizeClassif);
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
      editClassificationSchema.parse(editClassification);

      //mandar al back
      const res = await fetchData(
        `/admin/editClassification/${property_id}`,
        'PUT',
        editClassification,
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
    <section>
      <Form className="form-container">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="remodelingInput" className="fw-bold">
                Estado de la vivienda
              </Form.Label>
              <Form.Select
                id="remodelingInput"
                name="property_status"
                value={editClassification.property_status ?? ''}
                onChange={handleChange}
                className={
                  editClassification.property_status === null
                    ? 'form-disabled'
                    : ''
                }
              >
                <option value="" disabled>
                  Estado de la vivienda
                </option>
                <option value="1">Inactiva</option>
                <option value="2">Prospecto</option>
                <option value="3">Disponible</option>
                <option value="4">Reservado</option>
                <option value="5">Alquilado</option>
                <option value="6">Vendido</option>
              </Form.Select>
              {valErrors.property_status && (
                <Form.Text className="text-danger">Mensaje</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="typeHousingInput" className="fw-bold">
                Tipo de vivienda
              </Form.Label>
              <Form.Select
                id="typeHousingInput"
                name="property_classification"
                value={editClassification.property_classification ?? ''}
                onChange={handleChange}
                className={
                  editClassification.property_classification === null
                    ? 'form-disabled'
                    : ''
                }
              >
                <option value="" disabled>
                  Tipo de vivienda
                </option>
                <option value="1">Piso</option>
                <option value="2">Vivienda pareada</option>
                <option value="3">Vivienda adosada</option>
                <option value="4">Vivienda individual</option>
                <option value="5">Ático</option>
                <option value="6">Habitación</option>
                <option value="7">Parcela</option>
                <option value="8">Casa rústica</option>
                <option value="9">Garaje</option>
                <option value="10">Plaza de parking</option>
                <option value="11">Trastero</option>
                <option value="12">Edificio</option>
                <option value="13">Terreno</option>
                <option value="14">Nave industrial</option>
                <option value="15">Oficina</option>
                <option value="16">Local</option>
              </Form.Select>
              {valErrors.property_classification && (
                <Form.Text className="text-danger">Mensaje</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="typeAgreementInput" className="fw-bold">
                Tipo de acuerdo
              </Form.Label>
              <Form.Select
                id="typeAgreementInput"
                name="agreement_type"
                value={editClassification.agreement_type ?? ''}
                onChange={handleChange}
                className={
                  editClassification.agreement_type === null
                    ? 'form-disabled'
                    : ''
                }
              >
                <option value="" disabled>
                  Tipo de acuerdo
                </option>
                <option value="1">Exclusiva</option>
                <option value="2">Competencia libre</option>
              </Form.Select>
              {valErrors.agreement_type && (
                <Form.Text className="text-danger">Mensaje</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label
                htmlFor="energyClassificationInput"
                className="fw-bold"
              >
                Clasificación energética
              </Form.Label>
              <Form.Select
                id="energyClassificationInput"
                name="energ_qualification"
                value={editClassification.energ_qualification ?? ''}
                onChange={handleChange}
                className={
                  editClassification.energ_qualification === null
                    ? 'form-disabled'
                    : ''
                }
              >
                <option value="" disabled>
                  Clasificación energética
                </option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
                <option value="4">D</option>
                <option value="5">E</option>
                <option value="6">F</option>
                <option value="7">G</option>
                <option value="8">En trámite</option>
                <option value="9">No especificado</option>
                <option value="10">Exento</option>
              </Form.Select>
              {valErrors.energ_qualification && (
                <Form.Text className="text-danger">Mensaje</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="energyCertificateInput" className="fw-bold">
                Certificado de emisión energética
              </Form.Label>
              <Form.Select
                id="energyCertificateInput"
                name="energ_certification"
                value={editClassification.energ_certification ?? ''}
                onChange={handleChange}
                className={
                  editClassification.energ_certification === null
                    ? 'form-disabled'
                    : ''
                }
              >
                <option value="" disabled>
                  Certificado de emisión energética
                </option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
                <option value="4">D</option>
                <option value="5">E</option>
                <option value="6">F</option>
                <option value="7">G</option>
                <option value="8">En trámite</option>
                <option value="9">No especificado</option>
                <option value="10">Exento</option>
              </Form.Select>
              {valErrors.energ_certification && (
                <Form.Text className="text-danger">Mensaje</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="orientationInput" className="fw-bold">
                Orientación
              </Form.Label>
              <Form.Select
                id="orientationInput"
                name="orientation"
                value={editClassification.orientation ?? ''}
                onChange={handleChange}
                className={
                  editClassification.orientation === null
                    ? 'form-disabled'
                    : ' '
                }
              >
                <option value="" disabled>
                  Orientación
                </option>
                <option value="1">Norte</option>
                <option value="2">Sur</option>
                <option value="3">Este</option>
                <option value="4">Oeste</option>
                <option value="5">Noroeste</option>
                <option value="6">Noreste</option>
                <option value="7">Suroeste</option>
                <option value="8">Sureste</option>
              </Form.Select>
              {valErrors.orientation && (
                <Form.Text className="text-danger">Mensaje</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="surfaceInput" className="fw-bold">
                Superficie útil
              </Form.Label>
              <Form.Control
                id="surfaceInput"
                placeholder="Superficie útil"
                type="number"
                min="0"
                name="util_surface"
                value={editClassification.util_surface ?? ''}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors.util_surface && (
              <Form.Text className="text-danger">Mensaje</Form.Text>
            )}

            <Form.Group className="mb-3">
              <Form.Label htmlFor="garageSurfaceInput" className="fw-bold">
                Superficie de garaje
              </Form.Label>
              <Form.Control
                id="garageSurfaceInput"
                placeholder="Superficie de garaje"
                type="number"
                min="0"
                name="garage_surface"
                value={editClassification.garage_surface ?? ''}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors.garage_surface && (
              <Form.Text className="text-danger">Mensaje</Form.Text>
            )}
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="terraceSurfaceInput" className="fw-bold">
                Superficie terrazas
              </Form.Label>
              <Form.Control
                id="terraceSurfaceInput"
                placeholder="Superficie terrazas"
                type="number"
                min="0"
                name="terrace_surface"
                value={editClassification.terrace_surface ?? ''}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors.terrace_surface && (
              <Form.Text className="text-danger">Mensaje</Form.Text>
            )}

            <Form.Group className="mb-3">
              <Form.Label htmlFor="poolSurfaceInput" className="fw-bold">
                Superficie piscina
              </Form.Label>
              <Form.Control
                id="poolSurfaceInput"
                placeholder="Superficie piscina"
                type="number"
                min="0"
                name="pool_surface"
                value={editClassification.pool_surface ?? ''}
                onChange={handleChange}
              />
            </Form.Group>
            {valErrors.pool_surface && (
              <Form.Text className="text-danger">Mensaje</Form.Text>
            )}
          </Col>
        </Row>
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
          <div className="text-center">
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
    </section>
  );
};
