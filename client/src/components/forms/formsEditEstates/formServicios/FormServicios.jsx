import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { fetchData } from '../../../../helpers/axiosHelper';
import { useParams } from 'react-router-dom';
import { ZodError } from 'zod';
import { editServicesSchema } from '../../../../schemas/formEditStateSchemas/editServicesSchema';



const initialValue = {
  communications: null,
  supermarkets: null,
  street_status: null,
  mobile_coverage: null,
  parking: null,
  views: null,
  health_places: null,
  shops: null,
  schools: null,
  visitor_zone: null,
  visitor_building: null,
  visitor_property: null,
  property_id: null
};

export const FormServicios = () => {
  const {token} = useContext(AuthContext);
  const [editServices, setEditServices] = useState(initialValue);
  const [buttons, setButtons] = useState('');
  const [valErrors, setValErrors] = useState({});
  const {property_id} = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(()=>{
    const fetchServices = async() => {
      try {
        const res = await fetchData(`/admin/getServices/${property_id}`, "GET", property_id, token);

        
        if(res.data && res.data.services && res.data.services.length > 0) {
          setEditServices(res.data.services[0]);
          setButtons('edit');
        }else{
          setEditServices(initialValue);
          setButtons('create');
        }

      } catch (error) {
        console.log("Error al cargar servicios", error);
      }
    }
    
    if(property_id) {
      fetchServices();
    }
  }, [property_id, token]);

  const handleChange = (e) => {
    let {name, value} = e.target;

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);

    let numberFields = [
      'communications',
      'supermarkets',
      'street_status',
      'mobile_coverage',
      'parking',
      'views',
      'health_places',
      'shops',
      'schools',
      'visitor_zone',
      'visitor_building',
      'visitor_property'
    ];

    if(numberFields.includes(name)){
      value = parseInt(value);
    }

    setEditServices({...editServices, [name]: value});
  };

  
  const onCreate = async() => {

    try {
      //validaciones
     editServicesSchema.parse(editServices);
  
      //mandar al back
      const res = await fetchData(`/admin/createServices/${property_id}`, "POST", editServices, token);
      
  
      setValErrors({});
      setSuccessMessage('✅ Datos guardados correctamente');

      // volvemos a llamar al GET para actualizar el form
      const reFetch = await fetchData(`/admin/getServices/${property_id}`, "GET", property_id, token);

      if (reFetch.data && reFetch.data.services && reFetch.data.services.length > 0) {
        setEditServices(reFetch.data.services[0]);
        setButtons('edit');
      }

      
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

  const onEdit = async() => {

    try {
      //validaciones
      editServicesSchema.parse(editServices);
  
      //mandar al back
      const res = await fetchData(`/admin/editServices/${property_id}`, "PUT", editServices, token);
      
  
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
    <Form className='form-container'>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="comunicacionesInput" className="fw-bold">Comunicaciones</Form.Label>
            <Form.Select
              id="comunicacionesInput"
              value={editServices.communications ?? ""}
              onChange={handleChange}
              name="communications"
              className={editServices.communications===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.communications &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="supermarketsInput" className="fw-bold">Supermercados</Form.Label>
            <Form.Select
              id="supermparketsInput"
              value={editServices.supermarkets ?? ""}
              onChange={handleChange}
              name="supermarkets"
              className={editServices.supermarkets===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.supermarkets &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="streetStatusInput" className="fw-bold">Estado de la calle</Form.Label>
            <Form.Select
              id="streetStatusInput"
              value={editServices.street_status ?? ""}
              onChange={handleChange}
              name="street_status"
              className={editServices.street_status===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.street_status &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="coberturaInput" className="fw-bold">Cobertura</Form.Label>
            <Form.Select
              id="coberturaInput"
              value={editServices.mobile_coverage ?? ""}
              onChange={handleChange}
              name="mobile_coverage"
              className={editServices.mobile_coverage===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.mobile_coverage &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="parkingInput" className="fw-bold">Aparcamiento</Form.Label>
            <Form.Select
              id="parkingInput"
              value={editServices.parking ?? ""}
              onChange={handleChange}
              name="parking"
              className={editServices.parking===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.parking &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="vistasInput" className="fw-bold">Vistas </Form.Label>
            <Form.Select
              id="vistasInput"
              value={editServices.views ?? ""}
              onChange={handleChange}
              name="views"
              className={editServices.views===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.views &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="healthInput" className="fw-bold">Centro de Salud / Hospital</Form.Label>
            <Form.Select
              id="healthInput"
              value={editServices.health_places ?? ""}
              onChange={handleChange}
              name="health_places"
              className={editServices.health_places===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.health_places &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="shopsInput" className="fw-bold">Comercios</Form.Label>
            <Form.Select
              id="shopsInput"
              value={editServices.shops ?? ""}
              onChange={handleChange}
              name="shops"
              className={editServices.shops===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.shops &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="colegiosInput" className="fw-bold">Colegios</Form.Label>
            <Form.Select
              id="colegiosInput"
              value={editServices.schools ?? ""}
              onChange={handleChange}
              name="schools"
              className={editServices.schools===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.schools &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>

          <h5 className='pt-5'>Puntuación del visitador</h5>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="zonaInput" className="fw-bold">Zona</Form.Label>
            <Form.Select
              id="zonaInput"
              value={editServices.visitor_zone ?? ""}
              onChange={handleChange}
              name="visitor_zone"
              className={editServices.visitor_zone===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.visitor_zone &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="edificioInput" className="fw-bold">Edificio</Form.Label>
            <Form.Select
              id="edificioInput"
              value={editServices.visitor_building ?? ""}
              onChange={handleChange}
              name="visitor_building"
              className={editServices.visitor_building===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.visitor_building &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="viviendaInput" className="fw-bold">Vivienda</Form.Label>
            <Form.Select
              id="viviendaInput"
              value={editServices.visitor_property ?? ""}
              onChange={handleChange}
              name="visitor_property"
              className={editServices.visitor_property===null?"form-disabled":""}
            >
              <option value="" disabled>1-10</option>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
            {valErrors.visitor_property &&
              <Form.Text className='text-danger'>
                Mensaje
              </Form.Text>
            }
          </Form.Group>
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
  )
}
