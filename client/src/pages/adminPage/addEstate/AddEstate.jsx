import React from 'react'
import { FormCreate } from '../../../components/forms/FormCreate/FormCreate'
import './AddEstate.css'

const AddEstate = () => {
  return (
    <section className='bg-form'>
      <div className="d-flex flex-column align-items-center text-white py-5">
        <h2>Crear nueva propiedad</h2>
        <div className="line-title-white"></div>
      </div>
      <div className='position-form'>
          <div className="property_form">
            <div className='form-btns'>
              <button className='weight'>Principal</button>
              <button className='btn-disabled weight' disabled>Dirección</button>
              <button className='btn-disabled weight' disabled>Clasificación</button>
              <button className='btn-disabled weight' disabled>Entorno</button>
              <button className='btn-disabled weight' disabled>Servicios</button>
              <button className='btn-disabled weight' disabled>Equipamientos</button>
              <button className='btn-disabled weight' disabled>Colaboradores</button>
              <button className='btn-disabled weight' disabled>Archivos</button>
            </div>
            <FormCreate />
          </div>
      </div>
    </section>
  )
}

export default AddEstate;
