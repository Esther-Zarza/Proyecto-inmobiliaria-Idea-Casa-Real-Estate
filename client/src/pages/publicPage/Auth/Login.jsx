import React from 'react';
import './login.css'
import { FormLogin } from '../../../components/forms/formLogin/FormLogin';

export const Login = () => {
  return (
       <section className='bg-form'>
      <div className="position-form">
        <div className="min-width">
          <FormLogin />
        </div>
      </div>
    </section>
  );
};

export default Login;
