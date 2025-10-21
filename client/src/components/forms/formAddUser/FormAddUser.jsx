import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addUserSchema } from '../../../schemas/AddUserSchemas.js';
import { fetchData } from '../../../helpers/axiosHelper.js';
import {  ZodError } from 'zod';
import { ModalInvitation } from '../../modals/modalsInvitation/ModalInvitation.jsx'

const initialValue = {
  name: '',
  email: '',
  userType: '',
};

export const FormAddUser = () => {
  const [addUser, setAddUser] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [showModalInvitation, setShowModalInvitation] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      //validaciones
      addUserSchema.parse(addUser);

      const res = await fetchData('/admin/addUser', 'POST', addUser);

      setShowModalInvitation(true);
      setValErrors({});
      
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
      } else if (error.status === 400) {
        setValErrors({emailInUse: "Este email ya esta registrado"});
      }else {
        console.log('otro error', error);
      }
    }
  };


  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nameInput">Nombre</Form.Label>
        <Form.Control
          id="nameInput"
          placeholder="Nombre"
          name="name"
          value={addUser.name}
          onChange={handleChange}
        />
      </Form.Group>
      {valErrors?.name && (
        <Form.Text className="text-danger">
          El nombre debe contener al menos un carácter
        </Form.Text>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="emailInput">Email</Form.Label>
        <Form.Control
          id="emailInput"
          placeholder="Email"
          name="email"
          value={addUser.email}
          onChange={handleChange}
        />
      </Form.Group>
      {valErrors?.email && (
        <Form.Text className="text-danger">No es un email valido</Form.Text>
      )}
      {valErrors?.emailInUse === "Este email ya esta registrado" && (
        <Form.Text className="text-danger">Este email ya esta registrado</Form.Text>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="userTypeInput">Tipo de usuario</Form.Label>
        <Form.Select
          id="userTypeInput"
          value={addUser.userType}
          onChange={handleChange}
          name="userType"
          className={addUser.userType === '' ? 'form-disabled' : ''}
        >
          <option value="" disabled>
            Amin / Colaborador
          </option>
          <option value="1">Admin</option>
          <option value="2">Colaborador</option>
        </Form.Select>
        {valErrors?.userType && (
          <Form.Text className="text-danger">
            Debes elegir un tipo de usuario
          </Form.Text>
        )}
      </Form.Group>
      <div className="text-center">
        <button type="button" onClick={onSubmit} className="btn-1">
          Enviar invitación
        </button>
        {showModalInvitation && <ModalInvitation />}
      </div>
      {/* <div className="text-center">
          <button type="button" onClick={sendNewPasswordMail} className="btn-1">Cambiar Mail conectado</button>
        </div> */}
    </Form>
  );
};
