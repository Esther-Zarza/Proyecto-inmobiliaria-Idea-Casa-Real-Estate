import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ModalPasswordRequirement = ({token, setShowModalPassword}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/changePassword/${token}`);
    setShowModalPassword(false);
  }

  return (
    <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header
          onClick={handleClose}
          closeButton
          className="modalcontact"
        ></Modal.Header>
        <h2 className="fs-5">Requisitos de contraseña: </h2>
        <hr />

        <ul>
          <li>Debe tener al menos una Mayúscula </li>
          <li>Debe incluir al menos 1 carácter y un número </li>
          <li>Debe tener mínimo un símbolo</li>
          <li>Debe tener mínimo 8 carácteres </li>
        </ul>

          <div className=' d-flex justify-content-center'><img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className='w-50' /></div>
      </Modal.Dialog>
    </div>
  );
};
