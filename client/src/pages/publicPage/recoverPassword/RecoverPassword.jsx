import React from 'react'
import { FormRecoverPassword } from '../../../components/forms/formRecoverPassword/FormRecoverPassword'

export const RecoverPassword = () => {
  return (
    <section className='bg-form'>
               <div className="d-flex flex-column align-items-center text-white py-5">
                 <h2>Recuperar contraseña</h2>
                 <div className="line-title-white"></div>
               </div>
                <div className='position-form'>
                  <div className='min-width-little-2'>
                    <FormRecoverPassword />
                  </div>
                </div>
             </section>
  )
}
