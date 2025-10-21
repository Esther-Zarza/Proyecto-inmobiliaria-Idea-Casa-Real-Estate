import React from 'react';
import './FormRecoverPassword.css'
import { useState } from 'react';
import { addUserSchema } from '../../../schemas/recoverPasswordSchemas.js';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper.js';
import { Form } from 'react-bootstrap';
import { ModalPasswordLogin } from '../../modals/modalsPassword/ModalPasswordLogin.jsx';

export const FormRecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [showModalPasswordLogin, setShowModalPasswordLogin] = useState(false);

  const [valErrors, setValErrors] = useState({});

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onSubmit = async () => {
    try {
      //validacion
      addUserSchema.parse({ email });

      const res = await fetchData('/newPassword', 'POST', { email });
      setShowModalPasswordLogin(true);
      setValErrors({})
      
    } catch (error) {
      if (error instanceof ZodError) {
        const fileError = {};

        error.issues.forEach((elem) => {
          fileError[elem.path[0]] = elem.message;
        });

        setValErrors(fileError);
      } else if (error.response.data.errno === 1062) {
        // 1062 es error de duplicidad, ya existe por ejemplo ese email y en la base de datos es de tipo unique
        setValErrors({ email: 'El email ya existe' });
      } else {
        
        setValErrors({ email: 'No se encuentra el email' });
      }
    }
  };

  return (
    <Form className="form-container-recover">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="emailInput">Email</Form.Label>
        <Form.Control
          id="emailInput"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        {valErrors?.email && (
          <Form.Text className="text-danger">{valErrors.email}</Form.Text>
        )}
      </Form.Group>
      <div className="text-center">
        <button type="button" className="btn-1 me-2" onClick={onSubmit}>
          Enviar
        </button>
        {showModalPasswordLogin && <ModalPasswordLogin />}
      </div>
    </Form>
  );
};
