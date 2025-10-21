import React from 'react'
import { FormChangePassword } from '../../../components/forms/formChangePassword/FormChangePassword'

export const ChangePassword = () => {
  return (

    <section className='bg-form'>
           <div className="d-flex flex-column align-items-center text-white py-5">
            <h2>Recuperar contraseña</h2>
            <div className="line-title-white"></div>
          </div>
          <div className="position-form">
            <div className="min-width-little">
             <FormChangePassword/>
            </div>
          </div>
           </section>
  
       
  )
}
