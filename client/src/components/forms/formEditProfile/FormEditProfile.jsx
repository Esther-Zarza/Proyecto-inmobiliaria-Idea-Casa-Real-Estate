import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { editProfileSchemas } from '../../../schemas/EditProfileSchemas';
import { ModalPasswordEditProfile } from '../../modals/modalsPassword/ModalPasswordEditProfile';


export const FormEditProfile = () => {
  const { user, token, setUser, setToken } = useContext(AuthContext);
  const [showModalPasswordEditProfile, setShowModalPasswordEditProfile] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [userEdit, setUserEdit] = useState({
    ...user,
    user_name: user?.user_name ? user.user_name : '',
    user_last_name: user?.user_last_name ? user.user_last_name : '',
    user_phone: user?.user_phone ? user.user_phone : '',
    user_dni: user?.user_dni ? user.user_dni : '',
    cif: user?.cif ? user.cif : '',
  });
  const [valErrorsEdit, setValErrorsEdit] = useState({});

  const navigate = useNavigate();

  // const [userEdit, setUserEdit] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEdit({ ...userEdit, [name]: value });

    if (successMessage) setSuccessMessage('');
    if (!unsavedChanges) setUnsavedChanges(true);
  };

  const onSubmit = async () => {
    try {
      editProfileSchemas.parse(userEdit);
      //guardar token en el localStorage
      localStorage.setItem('token', token);

      //hacer una petición al back para traerme los datos de usuarios
      let resEdit = await fetchData(
        '/admin/editProfileAdmin',
        'PUT',
        userEdit,
        token
      );
      
      setToken(token);

      setValErrorsEdit({});
      setSuccessMessage('✅ Datos guardados correctamente');
      setUser({
        ...user,
        user_name: userEdit.user_name,
        user_last_name: userEdit.user_last_name,
        user_phone: userEdit.user_phone,
        user_dni: userEdit.user_dni,
        cif: userEdit.cif,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        
        const fieldErrors = {};

        error.issues.forEach((elem) => {
          fieldErrors[elem.path[0]] = elem.message;
        });

        setValErrorsEdit(fieldErrors);
      } else if (error.response.status === 401) {
        setValErrorsEdit({ error: error.response.data.message });
        
      }
    }
  };

  const sendNewPasswordMail = async () => {
    const token = localStorage.getItem('token');

    const res = await fetchData('/user/newPassword', 'GET', null, token);
    setShowModalPasswordEditProfile(true);
    
  };

  return (
    <Form className="form-container p-3">
      <Form.Group className="mb-3 ">
        <Form.Label htmlFor="nameInput" className="fw-bold">
          Nombre
        </Form.Label>
        <Form.Control
          id="nameInput"
          placeholder="Nombre"
          type="text"
          name="user_name"
          value={userEdit?.user_name}
          onChange={handleChange}
        />

        <Form.Text className="text-danger"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="lastNameInput" className="fw-bold">
          Apellidos
        </Form.Label>
        <Form.Control
          id="lastNameInput"
          placeholder="Apellidos"
          type="text"
          name="user_last_name"
          value={userEdit?.user_last_name ? userEdit.user_last_name : ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="phoneInput" className="fw-bold">
          Teléfono
        </Form.Label>
        <Form.Control
          type="text"
          id="phoneInput"
          placeholder="Teléfono"
          name="user_phone"
          value={userEdit?.user_phone ? userEdit.user_phone : ''}
          onChange={handleChange}
        />
        {valErrorsEdit.user_phone && (
          <Form.Text className="text-danger">
            {valErrorsEdit.user_phone}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="DNIInput" className="fw-bold">
          DNI
        </Form.Label>
        <Form.Control
          type="text"
          id="DNIInput"
          placeholder="DNI"
          name="user_dni"
          value={userEdit?.user_dni ? userEdit.user_dni : ''}
          onChange={handleChange}
        />
        {valErrorsEdit.user_dni && (
          <Form.Text className="text-danger">
            {valErrorsEdit.user_dni}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="CIFInput" className="fw-bold">
          CIF
        </Form.Label>
        <Form.Control
          type="text"
          id="CIFdInput"
          placeholder="CIF"
          name="cif"
          value={userEdit?.cif ? userEdit.cif : ''}
          onChange={handleChange}
        />
        {valErrorsEdit.cif && (
          <Form.Text className="text-danger">{valErrorsEdit.cif}</Form.Text>
        )}
      </Form.Group>

      <div className="text-center w-100">
        {successMessage && (
          <>
            <div className="alert alert-success text-center" role="alert">
              {successMessage}
            </div>
            <button
              type="button"
              disabled
              className="btn-3 me-2"
              onClick={onSubmit}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn-2"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </>
        )}

        {unsavedChanges && !successMessage && (
          <>
            <div className="alert alert-warning text-center" role="alert">
              ⚠️ Hay cambios sin guardar
            </div>
            <button type="button" className="btn-1 me-2" onClick={onSubmit}>
              Editar
            </button>
            <button
              type="button"
              className="btn-3"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
      <div>
        <p className="mt-2">
          Cambia tu contraseña
          <button
            type="button"
            onClick={sendNewPasswordMail}
            className="btn-a-1"
          >
            aquí.
          </button>
        </p>
        {showModalPasswordEditProfile && <ModalPasswordEditProfile />}
      </div>
    </Form>
  );
};
