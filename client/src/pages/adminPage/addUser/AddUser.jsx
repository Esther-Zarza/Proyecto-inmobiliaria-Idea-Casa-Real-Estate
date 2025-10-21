import React from 'react'
import { FormAddUser } from '../../../components/forms/formAddUser/FormAddUser';

const AddUser = () => {
  return (
         <section className='bg-form'>
           <div className="d-flex flex-column align-items-center text-white py-5">
             <h2>Crear usuario</h2>
             <div className="line-title-white"></div>
           </div>
            <div className='position-form '>
              <div className='min-width-little'>
                <FormAddUser/>
              </div>
            </div>
         </section>
  )
}

export default AddUser;