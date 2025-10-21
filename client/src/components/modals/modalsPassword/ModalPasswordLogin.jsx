import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../modalsCss/modalSmall.css';
import { Modal } from 'react-bootstrap';

export const ModalPasswordLogin = () => {
  const navigate= useNavigate()
  return (
   <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header
          onClick={() => navigate('/login')}
          closeButton
          className="modalcontact"
        ></Modal.Header>
        <h2>Email enviado</h2>
        <hr />

        <Modal.Body>
          <p className='text-center'>
           Accede a tu email para cambiar la contraseña.
          </p>
          <div className=' d-flex justify-content-center'><img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className='logoIdeaCasa'/></div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  )
}
