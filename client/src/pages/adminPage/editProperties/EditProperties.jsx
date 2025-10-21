import React from 'react';
import FormEditPropertiesPhone from '../../../components/forms/formEditProperties/FormEditPropertiesPhone';
import FormEditProperties from '../../../components/forms/formEditProperties/FormEditProperties';
import './EditProperties.css'

const EditProperties = () => {
  return (
    <section className='bg-form'>
      <div className="d-flex flex-column align-items-center text-white py-5">
        <h2>Editar propiedadades</h2>
        <div className="line-title-white"></div>
      </div>

      <div className='position-form'>
        <FormEditPropertiesPhone/>
        <FormEditProperties />
      </div>
    </section>
  );
};

export default EditProperties;
