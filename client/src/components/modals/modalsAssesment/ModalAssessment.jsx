import '../modalsCss/modalSmall.css'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const ModalAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header closeButton onClick={() => navigate('/')}></Modal.Header>
        <h2 className='text-center'>Formulario enviado</h2>
        <hr />
        <Modal.Body className="modal-body">
          <p>
           El formulario se ha enviado correctamente.
          </p>
          <div className="d-flex justify-content-center">
            <img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className="logoIdeaCasa" />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};
