import React from 'react';
import { Modal } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import '../modalsCss/modalSmall.css';

export const ModalPasswordokey = () => {
  const Navigate = useNavigate();
  return (
    <div className="modal-overlay-login-edit">
      <Modal.Dialog className="modal-content-contacs">
        <Modal.Header
          onClick={() => Navigate('/login')}
          closeButton
          className=" modal-header-contact"
        ></Modal.Header>
        <h3>Contraseña cambiada</h3>
        <hr />
        <p>La contraseña se ha cambiado correctamente</p>
        <div className="d-flex justify-content-center">
          <img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className='w-50'/>
        </div>
      </Modal.Dialog>
    </div>
  );
};
