import React from 'react';
import { Modal } from 'react-bootstrap';
import '../modalsCss/modalSmall.css';
import { useNavigate } from 'react-router-dom';

export const ModalPasswordEditProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header
          onClick={() => navigate('/')}
          closeButton
          className="modalcontact"
        ></Modal.Header>
        <h2 className="text-center">Email enviado</h2>
        <hr />

        <Modal.Body>
          <p>Accede a tu email para cambiar la contraseña.</p>
          <div className="d-flex justify-content-center">
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa"
              className="logoIdeaCasa"
            />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
