import React, { useState } from 'react';
import './EditEstate.css';
import { FormEditClassifyHousing } from '../../../components/forms/formsEditEstates/formEditClassifyHousing/FormEditClassifyHousing';
import { FormServicios } from '../../../components/forms/formsEditEstates/formServicios/FormServicios';
import { FormEquipments } from '../../../components/forms/formsEditEstates/formEquipments/FormEquipments';
import { FormPrincipal } from '../../../components/forms/formsEditEstates/formPrincipal/FormPrincipal';
import { FormEnvironment } from '../../../components/forms/formsEditEstates/formEditEnviroment/FormEnvironment';
import { FormAddress } from '../../../components/forms/formsEditEstates/formAddress/FormAddress';
import { FormEditCollaborator } from '../../../components/forms/formsEditEstates/formsEditCollaborator/FormEditCollaborator';
import { FormEditFiles } from '../../../components/forms/formsEditEstates/formEditFiles/FormEditFiles';
import { useNavigate, useParams } from 'react-router-dom';



const EditEstate = () => {
  const [activeForm, setActiveForm] = useState('principal');
  const navigate = useNavigate();
  const {property_id} = useParams();


  const renderForm = () => {
    switch (activeForm) {
      case 'principal':
        return <FormPrincipal />;
      case 'address':
        return <FormAddress />;
      case 'clasificacion':
        return <FormEditClassifyHousing />;
      case 'entorno':
        return <FormEnvironment/>;
      case 'servicios':
        return <FormServicios />;
      case 'equipamientos':
        return <FormEquipments />
      case 'Colaboradores':
         return <FormEditCollaborator/>
      case 'archivos':
        return <FormEditFiles />
      default:
        return <FormPrincipal />;
    }
  };
  return (
    <section className="section-editEstate ">
      <div className="d-flex flex-column align-items-center text-white py-5">
        <h2>Administrar propiedad</h2>
        <div className="line-title-white"></div>
      </div>

      <div className='navigate-btns d-flex justify-content-center gap-3 flex-wrap'>
        <button
          className='btn-1'
          onClick={()=>{navigate('/admin/allProperties')}}
        >Lista Viviendas</button>
        <button
          className='btn-1'
          onClick={()=>{navigate('/admin/allAppraisals')}}
        >Lista Valoraciones</button>
        <button
          className='btn-1'
          onClick={()=>{navigate(`/admin/infoVivienda/${property_id}`)}}
        >Ir a la Vivienda 🏡</button>
      </div>

      <div className="position-form">
        <div className="property_form">
          <div className="form-btns">
            <button
              onClick={() => setActiveForm('principal')}
              className={activeForm === 'principal' ? 'white': 'weight'}
            >
              Principal
            </button>
            <button
              onClick={() => setActiveForm('address')}
              className={activeForm === 'address' ? 'white'  : 'weight'}
            >
              Dirección
            </button>
            <button
              onClick={() => setActiveForm('clasificacion')}
              className={activeForm === 'clasificacion' ? 'white' : 'weight'}
            >
              Clasificación
            </button>
            <button 
              onClick={() => setActiveForm('entorno')}
              className={activeForm === 'entorno' ? 'white' : 'weight' }
            >
              Entorno
            </button>
            <button 
              onClick={()=>setActiveForm('servicios')}
              className={activeForm === 'servicios' ? 'white' : 'weight'}
            >
              Servicios
            </button>                
            <button
              onClick={() => setActiveForm('equipamientos')}
              className={activeForm === 'equipamientos' ? 'white' : 'weight'}
            >
              Equipamientos
            </button>
             <button 
              onClick={() => setActiveForm('Colaboradores')}
              className={activeForm === 'Colaboradores' ? 'white' : 'weight' }
            >
              Colaboradores
            </button>
            <button 
            onClick={() => setActiveForm('archivos')}
            className={activeForm === 'archivos' ? 'white' : 'weight' }>Archivos</button>
          </div>
          <div>{renderForm()}</div>
        </div>
      </div>

      <div className='navigate-btns d-flex justify-content-center gap-3 flex-wrap'>
        <button
          className='btn-1'
          onClick={()=>{navigate('/admin/allProperties')}}
        >Lista Viviendas</button>
        <button
          className='btn-1'
          onClick={()=>{navigate('/admin/allAppraisals')}}
        >Lista Valoraciones</button>
        <button
          className='btn-1'
          onClick={()=>{navigate(`/admin/infoVivienda/${property_id}`)}}
        >Ir a la Vivienda 🏡</button>
      </div>
    </section>
  );
};

export default EditEstate;
