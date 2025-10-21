import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper.js';
import { ZodError } from 'zod';
import { changePasswordSchema } from '../../../schemas/changePasswordSchemas.js';
import { Form } from 'react-bootstrap';
import { ModalPasswordokey } from '../../modals/modalsPassword/ModalPasswordokey.jsx';
import { ModalPasswordRequirement } from '../../modals/modalsPassword/ModalPasswordRequirement.jsx';

const initialValue = {
  password: '',
  confirmPassword: '',
};

export const FormChangePassword = () => {
  const [changePasswordForm, SetChangePasswordForm] = useState(initialValue);
  const [showModalPasswordOkey, setShowModalPasswordOkey] = useState(false);
  const [valErrors, setValErrors] = useState({});
  const [showModalPassword, setShowModalPassword] = useState(false);
  const params = useParams();

  const openModal = () => {
    setShowModalPassword(!showModalPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetChangePasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const changePassword = async () => {
    try {
      //validaciones
      changePasswordSchema.parse(changePasswordForm);

      const res = await fetchData('/user/changePassword', 'PUT', [
        params,
        changePasswordForm,
      ]);
      setShowModalPasswordOkey(true);
    } catch (error) {
      if (error instanceof ZodError) {
        const fileError = {};

        error.issues.forEach((elem) => {
          fileError[elem.path[0]] = elem.message;
        });

        setValErrors(fileError);
      } else {
        console.log('otro error', error);
      }
    }
  };

  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="passInput">
          Contraseña <i className="bi bi-question-circle" onClick={openModal}></i>
        </Form.Label>
        {showModalPassword &&
          <ModalPasswordRequirement 
            token={params.token}
            setShowModalPassword={setShowModalPassword}
          />
        }
        <Form.Control
          id="passInput"
          placeholder="Contraseña"
          name="password"
          value={changePasswordForm.password}
          onChange={handleChange}
        />
      </Form.Group>
      {valErrors?.password && (
        <Form.Text className="text-danger">
          La contraseña debe tener al menos 8 caracteres y contener una
          mayúscula, minúscula, número y símbolo.
        </Form.Text>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="confirmpassInput">Confirmar contraseña</Form.Label>
        <Form.Control
          id="confirmpassInput"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          value={changePasswordForm.confirmPassword}
          onChange={handleChange}
        />
      </Form.Group>
      {valErrors?.confirmPassword && (
        <Form.Text className="text-danger">
          La contraseña debe tener al menos 8 caracteres y contener una
          mayúscula, minúscula, número y símbolo.
        </Form.Text>
      )}
      <div className="text-center">
        <button type="button" onClick={changePassword} className="btn-1">
          Enviar
        </button>
        {showModalPasswordOkey && <ModalPasswordokey />}
      </div>
    </Form>
  );
};
