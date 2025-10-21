import React from 'react';
import '../modalsCss/modalMedium.css'
import { Button, Modal } from 'react-bootstrap';

export const ModalsContact = ({ setShowModalContact, showModalContacts }) => {
  return (
    <div className="modal-overlay-medium">
      <Modal.Dialog className="modal-content-medium">
        <Modal.Header
          onClick={() => setShowModalContact(showModalContacts)}
          closeButton
          className="modalcontact"
        ></Modal.Header>
        <h3>Email enviado</h3>
        <hr />

        <Modal.Body>
          <p>
            Gracias por ponerte en contacto con <span>IdeaCasa</span>, te
            atenderemos lo antes posible.
          </p>
          <div className='d-flex justify-content-center'><img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className='logoIdeaCasa'/></div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
