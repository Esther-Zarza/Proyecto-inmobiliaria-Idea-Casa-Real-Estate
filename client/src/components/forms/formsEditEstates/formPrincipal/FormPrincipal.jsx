import React, { useContext, useEffect, useState } from 'react'
import { ZodError } from 'zod';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { Col, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';
import { addEstateSchema } from '../../../../schemas/formEditStateSchemas/addEstateSchema';

export const FormPrincipal = () => {
  const {token} = useContext(AuthContext);
  const [editPrincipal, setEditPrincipal] = useState({});
  const [valErrors, setValErrors] = useState({});
  const {property_id} = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  

  useEffect(()=>{
    const fetchPrincipal = async() => {
      try {
        const res = await fetchData(`/admin/getPrincipal/${property_id}`, "GET", property_id, token);

        
        if(res.data && res.data.principal){
          const principal = res.data.principal[0];

          // Convertir campos numéricos que vienen de la db a booleanos
          const normalizePrincipal = {
            ...principal,
            price_hidden: Boolean(principal.price_hidden),
            is_public: Boolean(principal.is_public),
            is_highlighted: Boolean(principal.is_highlighted),
            keys_delivered: Boolean(principal.keys_delivered),
            elevator: Boolean(principal.elevator),

            price: principal.price ? parseFloat(principal.price.replace(',', '.')) : null,
            ibi: principal.ibi ? parseFloat(principal.ibi.replace(',', '.')) : null,
            registry_surface: principal.registry_surface ? parseFloat(principal.registry_surface.replace(',', '.')) : null
          };

          setEditPrincipal(normalizePrincipal);
        }

      } catch (error) {
        console.log("Error al cargar dirección", error);
      }
    }

    if(property_id) {
      fetchPrincipal();
    }
  }, [property_id, token]);
  

  const handleChange = (e) => {

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);

    if(e.target.type === 'checkbox'){
      const {name, checked} = e.target;
      setEditPrincipal({...editPrincipal, [name]: checked});
    }else if (e.target.type === 'radio'){
      const {name, value} = e.target;
      setEditPrincipal({...editPrincipal, [name]: parseInt(value)});
    }else if (e.target.type === 'number'){
      const {name, value} = e.target;
      setEditPrincipal({...editPrincipal, [name]: value === '' ? null : parseFloat(value)});
    }else{
      const {name, value} = e.target;
      setEditPrincipal({...editPrincipal, [name]: value});
    }
  }

  const onSubmit = async() => {
    try {
      //validación
      const val = addEstateSchema.parse(editPrincipal);
      
      //back
      const res = await fetchData(`/admin/editPrincipal/${property_id}`, 'PUT', editPrincipal, token);
      

      setValErrors({});
      setUnsavedChanges(false);
      setSuccessMessage('✅ Datos guardados correctamente');
      
    } catch (error) {
      if(error instanceof ZodError) {

        const fieldError = {};

        error.issues.forEach((elem)=>{
          fieldError[elem.path[0]]=elem.message;
        });

        setValErrors(fieldError);
        

      } else {
        console.log("Otro error", error);
      }
    }
  }

  return (
    <div>
      <Form className="form-container">
       
        <Row className='row-1'>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="titleInput" className='fw-bolder'>Título del inmueble</Form.Label>
              <Form.Control
                        id="titleInput"
                        placeholder="Título"
                        name="title"
                        value={editPrincipal.title ?? ""}
                        onChange={handleChange} />
            </Form.Group>
            {valErrors?.title && 
              <Form.Text className='text-danger'>
                {valErrors.title}
              </Form.Text>
            }
            <Form.Group className="mb-3">
              <Form.Label htmlFor="descriptionInput" className='fw-bolder'>Descripción</Form.Label>
              <Form.Control
                        id="descriptionInput"
                        as="textarea"
                        rows={6}
                        placeholder="Descripción del inmueble"
                        name="description"
                        value={editPrincipal.description ?? ""}
                        onChange={handleChange} />
            </Form.Group>
            {valErrors?.description && 
              <Form.Text className='text-danger'>
                {valErrors.description}
              </Form.Text>
            }
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="priceInput" className='fw-bolder'>Precio</Form.Label>
                  <Form.Control
                            id="priceInput"
                            placeholder="Precio"
                            name="price"
                            min="0"
                            type="number"
                            value={editPrincipal.price ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.price && 
                  <Form.Text className='text-danger'>
                    {valErrors.price}
                  </Form.Text>
                }
              </Col>
              <Col>
                <Form.Group className="mb-3 check-price">
                  <Form.Check
                            id="priceHiddenInput"
                            name="price_hidden"
                            type="checkbox"
                            label="Mostrar precio en web"
                            checked={!!editPrincipal.price_hidden}
                            onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="ibiInput" className='fw-bolder'>IBI</Form.Label>
                  <Form.Control
                            id="ibiInput"
                            placeholder="IBI"
                            name="ibi"
                            min="0"
                            type="number"
                            value={editPrincipal.ibi ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.ibi && 
                  <Form.Text className='text-danger'>
                    {valErrors.ibi}
                  </Form.Text>
                }
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="refCatInput" className='fw-bolder'>Referencia Catastral</Form.Label>
                  <Form.Control
                            id="refCatInput"
                            placeholder="Ref. Catastral"
                            name="catastral_reference"
                            value={editPrincipal.catastral_reference ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.catastral_reference && 
                  <Form.Text className='text-danger'>
                    {valErrors.catastral_reference}
                  </Form.Text>
                }
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="supRegInput" className='fw-bolder'>Superficie Registral</Form.Label>
                  <Form.Control
                            id="supRegInput"
                            placeholder="Superficie Reg."
                            name="registry_surface"
                            min="0"
                            type="number"
                            value={editPrincipal.registry_surface ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.registry_surface && 
                  <Form.Text className='text-danger'>
                    La superficie registral debe ser un número positivo con hasta 2 decimales
                  </Form.Text>
                }
              </Col>
              <Col>
                <Form.Group className="mb-3"> {/* mejorar este campo */}
                  <Form.Label htmlFor="yearInput" className='fw-bolder'>Año de construcción</Form.Label>
                  <Form.Control
                            id="yearInput"
                            placeholder="Año"
                            name="year_built"
                            min="0"
                            type="number"
                            value={editPrincipal.year_built ?? ""}
                            onChange={handleChange}
                  />
                </Form.Group>
                {valErrors?.year_built && 
                  <Form.Text className='text-danger'>
                    El año de construcción debe ser un año válido entre 1800 y 2099
                  </Form.Text>
                }
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bolder'>Tipo de operación/situación</Form.Label>
              <Row className='rounded border border-2 py-2 mb-1'>
                <Col>
                  <Form.Check
                            id="radio1"
                            type="radio"
                            label="Valoración"
                            name="property_type"
                            value={1}
                            checked={editPrincipal.property_type===1}
                            onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className='rounded border border-2 py-2'>
                <Col>
                  <Form.Check
                            id="radio2"
                            type="radio"
                            label="Venta"
                            name="property_type"
                            value={2}
                            checked={editPrincipal.property_type===2}
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
                            checked={editPrincipal.property_type===3}
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
                            checked={editPrincipal.property_type===4}
                            onChange={handleChange}
                  />
                </Col>
              </Row>
                {valErrors?.property_type && 
                  <Form.Text className='text-danger'>
                    {valErrors.property_type}
                  </Form.Text>
                }
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                            id=""
                            type="checkbox"
                            label="Visible en web"
                            name="is_public"
                            checked={!!editPrincipal.is_public}
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
                            checked={!!editPrincipal.is_highlighted}
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
                  <Form.Label htmlFor="bedroomInput" className='fw-bolder'>Habitaciones *</Form.Label>
                  <Form.Control
                            id="bedrroomInput"
                            placeholder="Nº de habitaciones"
                            name="bedrooms"
                            min="0"
                            type="number"
                            value={editPrincipal.bedrooms ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.bedrooms && 
                  <Form.Text className='text-danger'>
                    Introduce un número válido de habitaciones
                  </Form.Text>
                }
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="toiletInput" className='fw-bolder'>Baños *</Form.Label>
                  <Form.Control
                            id="toiletInput"
                            placeholder="Nº de baños"
                            name="toilets"
                            min="0"
                            type="number"
                            value={editPrincipal.toilets ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.toilets && 
                  <Form.Text className='text-danger'>
                    Introduce un número válido de baños
                  </Form.Text>
                }
              </Col>
            </Row>
            <Row className='pb-3'>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="numFloorsInput" className='fw-bolder'>Número de plantas / piso</Form.Label>
                  <Form.Control
                            id="numFloorsInput"
                            placeholder="Nº de plantas / piso"
                            name="number_floors"
                            type="number"
                            value={editPrincipal.number_floors ?? ""}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.number_floors && 
                  <Form.Text className='text-danger'>
                    Introduce un número válido
                  </Form.Text>
                }
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check
                            id=""
                            type="checkbox"
                            label="Llaves"
                            name="keys_delivered"
                            checked={!!editPrincipal.keys_delivered}
                            onChange={handleChange}
                  />
                </Form.Group>
              
                <Form.Group className="mb-3">
                  <Form.Check
                            id=""
                            type="checkbox"
                            label="Ascensor"
                            name="elevator"
                            checked={!!editPrincipal.elevator}
                            onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='pb-3'>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="startDateInput" className='fw-bolder'>Fecha inicio</Form.Label>
                  <Form.Control
                            id="startDateInput"
                            type="date"
                            placeholder=""
                            name="start_date"
                            value={editPrincipal.start_date}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.start_date && 
                  <Form.Text className='text-danger'>
                    {valErrors.start_date}
                  </Form.Text>
                }
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="endDateInput" className='fw-bolder'>Fecha fin</Form.Label>
                  <Form.Control
                            id="endDateInput"
                            type="date"
                            placeholder=""
                            name="end_date"
                            value={editPrincipal.end_date}
                            onChange={handleChange} />
                </Form.Group>
                {valErrors?.start_date && 
                  <Form.Text className='text-danger'>
                    {valErrors.end_date}
                  </Form.Text>
                }
              </Col>
              
            </Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="obsPrivInput" className='fw-bolder'>Observaciones privadas</Form.Label>
              <Form.Control
                        id="obsPrivInput"
                        as="textarea"
                        rows={9}
                        placeholder="Observaciones privadas"
                        name="private_observations"
                        value={editPrincipal.private_observations ?? ""}
                        onChange={handleChange} />
            </Form.Group>
            {valErrors?.private_observations && 
              <Form.Text className='text-danger'>
                {valErrors.private_observations}
              </Form.Text>
            }
          </Col>
        </Row>

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
  )
}
