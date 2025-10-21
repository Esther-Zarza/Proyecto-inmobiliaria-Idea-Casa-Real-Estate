import React from 'react'
import '../../../App.css'
import { FormEditProfile } from '../../../components/forms/formEditProfile/FormEditProfile'

const EditProfile = () => {
  return (
          <section className='bg-form'>
           <div className="d-flex flex-column align-items-center text-white py-5">
             <h2>Editar perfil</h2>
             <div className="line-title-white"></div>
           </div>
            <div className='position-form '>
              <div className='min-width-little'>
                <FormEditProfile/>
              </div>
            </div>
         </section>
       
  )
}
export default EditProfile;