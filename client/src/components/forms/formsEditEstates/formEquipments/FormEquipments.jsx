import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { fetchData } from "../../../../helpers/axiosHelper";
import { ZodError } from "zod";
import { editEquipmentSchema } from "../../../../schemas/formEditStateSchemas/editEquipmentSchema";




const FIELDS = [
  ["air_conditioning", "Aire acondicionado"],
  ["alarm", "Alarma"],
  ["high_standing", "Alto standing"],
  ["furished", "Amueblado"],
  ["built_in_wardrobes", "Armarios empotrados"],
  ["bbq", "Barbacoa"],
  ["chimney", "Chimenea"],
  ["furnished_kitchen", "Cocina amueblada"],
  ["equiped_kitchen", "Cocina equipada"],
  ["outdoors", "Exterior"],
  ["rustic_farm", "Finca rústica"],
  ["independent", "Independiente"],
  ["garden", "Jardín"],
  ["community_garden", "Jardín comunitario"],
  ["laundry_room", "Lavadero"],
  ["bright", "Luminoso"],
  ["parking", "Parking"],
  ["parking_space", "Plaza garaje incluida"],
  ["private_pool", "Piscina"],
  ["community_pool", "Piscina comunitaria"],
  ["porch", "Porche"],
  ["automatic_door", "Puerta automática"],
  ["sunny", "Soleado"],
  ["underfloor_heating", "Suelo radiante"],
  ["terrace", "Terraza"],
  ["storage_room", "Trastero incluido"],
  ["turistic", "Turístico"],
  ["sea_views", "Vistas al mar"],
  ["mountain_views", "Vistas al monte"]
];

export const FormEquipments = () => {
  const { token } = useContext(AuthContext);
  const { property_id } = useParams();
  const [buttons, setButtons] = useState('');
  const [valErrors, setValErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [editEquipment, setEditEquipment] = useState(
    Object.fromEntries(FIELDS.map(([k]) => [k, false]))
  );

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetchData(`/admin/getEquipment/${property_id}`, "GET", null, token);

        const equipment = res?.data?.equipment[0] || null;

        if (equipment) {
          //  convierte "0"/"1" o 0/1 en true/false
          const normalized = Object.fromEntries(
            Object.keys(editEquipment).map((key) => [key, Boolean(Number(equipment[key] ?? 0))])
          );
          setEditEquipment(prev => ({ ...prev, ...normalized }));
          setButtons('edit');
        } else {
          // Si aún no existe registro en la BD, todo a false
          setEditEquipment(Object.fromEntries(Object.keys(editEquipment).map((key) => [key, false])));
          setButtons('create')
        }
      } catch (error) {
        console.log("Error cargando equipamientos:", error);
      }
    };

      fetchEquipment();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property_id, token]);


  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);

    setEditEquipment(prev => ({ ...prev, [name]: checked }));
  };

  const onCreate = async() => {
  
    try {
      //validaciones
      editEquipmentSchema.parse(editEquipment);

      //mandar al back
      const res = await fetchData(`/admin/createEquipment/${property_id}`, "POST", editEquipment, token);
      
  
      setValErrors({});
      setSuccessMessage('✅ Datos guardados correctamente');

      // volvemos a llamar al GET para actualizar el form
      const reFetch = await fetchData(`/admin/getEquipment/${property_id}`, "GET", property_id, token);

      const equipment = reFetch?.data?.equipment[0] || null;

      if (equipment) {
        const normalized = Object.fromEntries(
          Object.keys(editEquipment).map((key) => [key, Boolean(Number(equipment[key] ?? 0))])
        );
        setEditEquipment(prev => ({ ...prev, ...normalized }));
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
      editEquipmentSchema.parse(editEquipment);
  
      //mandar al back
      const res = await fetchData(`/admin/editEquipment/${property_id}`, "PUT", editEquipment, token);
      
  
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


  const columns = 3;
  const perColumn = Math.ceil(FIELDS.length / columns);
  const groups = Array.from({ length: columns }, (_, i) =>
    FIELDS.slice(i * perColumn, (i + 1) * perColumn)
  );

  return (
    <div>
      <Form className="form-container">
        <Row className="mb-3">
          {groups.map((group, idx) => (
            <Col key={idx} md={4} sm={6} xs={12}>
              {group.map(([name, label]) => (
                <Form.Check
                  key={name}
                  className="mb-2"
                  type="checkbox"
                  id={`chk_${name}`}
                  name={name}
                  label={label}
                  checked={!!editEquipment[name]}
                  onChange={handleChange}
                />
              ))}
            </Col>
          ))}
        </Row>

        <div className="text-center">
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
      </div>
      </Form>
    </div>
  );

};
