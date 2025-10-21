import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../modalsCss/modalMedium.css';

export const ModalPlanos = ({ show, setShow, files }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const descargarImagen = async (filename) => {
    const url = `${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${filename}`;
    try {
      const response = await fetch(url, {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('No se pudo descargar la imagen');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename.split('-')[2];
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <Modal.Dialog className="modal-content">
        <Modal.Header onHide={handleClose} closeButton></Modal.Header>
        <h2 className="text-center">Planos</h2>
        <hr />
        <Modal.Body>
          {files.filter((elem) => elem.file_type === 2).length < 1 && 
          <p>Esta propiedad no dispone de planos</p>}
          <div className="d-flex flex-wrap">
            {files
              .filter((elem) => elem.file_type === 2)
              .map((elem, index) => {
                return (
                  <div className="card-file w-50">
                    <Card key={index}>
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_IMAGES
                        }/propiedades/${elem.filename}`}
                      />
                      <div className="buttons-file">
                        <button
                          onClick={() => {
                            descargarImagen(elem.filename);
                          }}
                          className="fs-3 btn-none"
                        >
                          <i class="bi-user bi-cloud-arrow-down-fill"></i>
                        </button>
                      </div>
                    </Card>
                  </div>
                );
              })}
          </div>
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
