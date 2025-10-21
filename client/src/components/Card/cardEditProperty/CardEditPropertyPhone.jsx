import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import './cardEditPropertyPhone.css';
import InfoCard from '../CardVivienda/components/InfoCard';
import { ModalDates } from '../../modals/modalsDate/ModalDates';

export const CardEditPropertyPhone = ({ property, onUpdate }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentProperty, setCurrentProperty] = useState({
    ...property,
    is_public: Boolean(property.is_public),
    is_disabled: Boolean(property.is_disabled),
    is_reserved: Boolean(property.is_reserved),
  });
  const [agreementDate, setAgreementDate] = useState([]);
  const [showModalDates, setShowModalDates] = useState(false);

  const [file,setFile] = useState({});

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await fetchData(
          `/admin/getDates/${currentProperty.property_id}`,
          'GET',
          currentProperty.property_id,
          token
        );

        if(res.data.dates){
          setAgreementDate(res.data.dates);
        }
      } catch (error) {
        console.log('Error trayendo fecha del acuerdo', error);
      }
    };
    fetchDates();
  }, []);

  // último elemento de la tabla period
  const last = agreementDate[agreementDate.length - 1];

  //transformar fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString({
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const editEstate = () =>
    navigate(`/admin/editEstate/${property.property_id}`);

  const onClickProperty = () =>
    navigate(`/admin/infoVivienda/${property.property_id}`);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const updated = { ...currentProperty, [name]: checked };
    setCurrentProperty(updated);
    onSubmit(updated);
  };

  const onSubmit = async (updatedProperty) => {
    try {
      const data = {
        is_public: Boolean(updatedProperty.is_public),
        is_disabled: Boolean(updatedProperty.is_disabled),
        is_reserved: Boolean(updatedProperty.is_reserved),
        property_id: updatedProperty.property_id,
      };
      const res = await fetchData(
        `/admin/editPropertyStatus/${currentProperty.property_id}`,
        'PUT',
        data,
        token
      );
      if (res.status === 200) onUpdate(updatedProperty);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      const getFile = async() => {
        try {
          const res = await fetchData(`/admin/getFile/${property.property_id}`,"GET", null);
          setFile(res.data.file[0]);
  
        } catch (error) {
          console.log("Error al traer los archivos", error)
        }
      }
  
      getFile();
  
    },[]);

  return (
    <section className="card-editProperties-phone p-2 border rounded bg-white shadow-sm">
      <Row className="align-items-start g-3">        
        <Col xs={12} md={6} className="text-center">
          <div onClick={onClickProperty}>
            {file ?
              <img
              src={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${file.filename}`}
              alt="Vivienda"
              className="img-fluid rounded"
              style={{ cursor: 'pointer' }}
            />
            :
            <img
              src="/images/bg/bg-Home.jpg"
              alt="Vivienda"
              className="img-fluid rounded"
              style={{ cursor: 'pointer' }}
            />}
            <strong className="d-block mt-2">{currentProperty.title}</strong>

            <div
              className={`text-white fw-bold px-2 py-1 mt-1 rounded ${
                currentProperty.is_reserved == 0
                  ? 'card-price-blue'
                  : 'card-price-red'
              }`}
            >
              <p className="mb-0 small">
                {currentProperty.is_reserved && 'RESERVADO'}
                {!currentProperty.is_reserved &&
                  currentProperty.property_type === 2 &&
                  'EN VENTA'}
                {!currentProperty.is_reserved &&
                  currentProperty.property_type === 3 &&
                  'ALQUILER'}
                {!currentProperty.is_reserved &&
                  currentProperty.property_type === 4 &&
                  'OBRA NUEVA'}
              </p>
              <p className="card-price mb-0">
                {Number(currentProperty.price).toLocaleString('es-ES', {
                  useGrouping: true
                })} €
              </p>
            </div>
          </div>
        </Col>
     
        <Col xs={12} md={6}>
          <div className="d-flex gap-2 justify-content-around ps-md-3">
            <div className="d-flex flex-column gap-2 ps-md-3">
              <p className="mb-0 address-truncate">
                {currentProperty.type_via} {currentProperty.street_name}{' '}
                {currentProperty.street_number}
              </p>
              {currentProperty.locality && (
                <p className="mb-0">
                  <strong>Localidad:</strong> {currentProperty.locality}
                </p>
              )}
              {currentProperty.municipality && (
                <p className="mb-0">
                  <strong>Ciudad:</strong> {currentProperty.municipality}
                </p>
              )}
              <InfoCard property={currentProperty} />
            </div>

            <div className="d-flex flex-column gap-2 ps-md-3">
              <p className="fw-bold mb-1">Fecha del acuerdo:</p>
              {agreementDate?.length > 0 ? (
                <>
                  <p className="mb-0">
                    {last.start_date
                      ? `Inicio: ${formatDate(last.start_date)}`
                      : 'Sin fecha de inicio'}
                  </p>
                  <p className="mb-1">
                    {last.end_date && `Fin: ${formatDate(last.end_date)}`}
                  </p>
                  <button
                    className="btn-2 btn-sm"
                    onClick={() => setShowModalDates(!showModalDates)}
                  >
                    Registro de fechas
                  </button>
                </>
              ) : (
                <p>No hay fechas registradas</p>
              )}
            </div>

            {showModalDates && (
              <ModalDates
                setShowModalDates={setShowModalDates}
                agreementDate={agreementDate}
                title={currentProperty.title}
              />
            )}
          </div>

        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12}>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Form.Check
              name="is_public"
              type="checkbox"
              label="Visible en web"
              checked={currentProperty.is_public}
              onChange={handleChange}
            />
            <Form.Check
              name="is_disabled"
              type="checkbox"
              label="Eliminada"
              checked={currentProperty.is_disabled}
              onChange={handleChange}
            />
            <Form.Check
              name="is_reserved"
              type="checkbox"
              label="Reservado"
              checked={currentProperty.is_reserved}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
   
      <Row className="mt-3">
        <Col className="text-center">
          <button
            type="button"
            onClick={editEstate}
            className="btn-1"
          >
            Editar
          </button>
        </Col>
      </Row>
    </section>
  );
};
