import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../modalsCss/modalSmall.css'

export const ModalInvitation = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header
          onClick={() => navigate('/admin/editUsers')}
          closeButton
          className="modalcontact"
        ></Modal.Header>
        <h2 className='text-center'>Email enviado</h2>
        <hr />

        <Modal.Body>
          <p>
            La invitación se ha enviado correctamente.
          </p>
          <div className="d-flex justify-content-center">
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa"
              className='logoIdeaCasa'
            />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
