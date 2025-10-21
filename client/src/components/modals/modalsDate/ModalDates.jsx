import React from 'react';
import { Modal } from 'react-bootstrap';
import '../modalsCss/modalMedium.css';

export const ModalDates = ({ setShowModalDates, agreementDate, title }) => {
  const handleClose = () => setShowModalDates(false);

  return (
    <div className="modal-overlay ">
      <Modal.Dialog className="modal-content">
        <Modal.Header
          onHide={handleClose}
          closeButton
          className=" modalcontact"
        ></Modal.Header>
        <h2 className='text-center'>Registro de fechas de acuerdo</h2>
        <hr />
        <p className="fw-bold fs-4 mb-3 text-center">{title}</p>
        <Modal.Body>
          {agreementDate &&
            agreementDate.map((date, i) => {
              return (
                <p key={i}>
                  <span>{i + 1}</span>.- {date.start_date} - {date.end_date}
                </p>
              );
            })}

          <div className="d-flex justify-content-center mt-4">
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
