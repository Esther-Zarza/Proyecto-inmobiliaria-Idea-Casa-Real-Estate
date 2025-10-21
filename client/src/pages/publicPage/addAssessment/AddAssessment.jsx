import React from 'react';
import FormAddAssessment from '../../../components/forms/formAddAssessment/FormAddAssessment';
import '../../../App.css'
import './addAssessment.css'

const AddAssessment = () => {
  return (
    <section className='bg-form'>
      <div className="position-form">
        <div className="min-width-little">
          <FormAddAssessment />
        </div>
      </div>
    </section>
  );
};

export default AddAssessment;
