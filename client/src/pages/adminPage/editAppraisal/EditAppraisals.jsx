import './EditAppraisals.css';
import { FormEditAppraisalsPhone } from '../../../components/forms/formEditAppraisals/FormEditAppraisalsPhone';
import { FormEditAppraisals } from '../../../components/forms/formEditAppraisals/FormEditAppraisals';

//APPRAISAL = VALORACIÓN / TASACIÓN
const EditAppraisals = () => {
    return (
    <section className='section-editAppraisal'>
      <div className="d-flex flex-column align-items-center text-white py-5">
        <h2>Administrar valoraciones</h2>
        <div className="line-title-white"></div>
      </div>
      
      <div className='position-form'>
        <FormEditAppraisalsPhone />
        <FormEditAppraisals />
      </div>
    </section>
  )
}

export default EditAppraisals;