import '../modalsCss/modalSmall.css'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ModalCreate = () => {
const navigate = useNavigate();
  return (
    <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header
         onClick={() => navigate('/admin/allProperties')}
          closeButton
          className="modalcontact"
        ></Modal.Header>
          <h2 className='text-center'>Propiedad creada</h2>
        <hr />
        <Modal.Body>
            <p className='text-center'>La propiedad se ha creado correctamente.</p>
        <div className='d-flex justify-content-center'><img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className='logoIdeaCasa'/></div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
