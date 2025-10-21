import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import InfoCard from '../CardVivienda/components/InfoCard';
import { Col, Form, Row } from 'react-bootstrap';
import './CardEditAppraisalPhone.css'
import { ModalDates } from '../../modals/modalsDate/ModalDates';

export const CardEditAppraisalPhone = ({appraisal, onUpdate}) => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentAppraisal, setCurrentAppraisal] = useState(appraisal);
  const [agreementDate, setAgreementDate] = useState([]);
  const [showModalDates, setShowModalDates] = useState(false);

  useEffect(()=>{
    const fetchDates = async() => {
      try {
        const res = await fetchData(`/admin/getDates/${currentAppraisal.property_id}`, 'GET', currentAppraisal.property_id, token);

        if(res.data.dates){
          setAgreementDate(res.data.dates);
        }
      } catch (error) {
        console.log("Error trayendo fecha del acuerdo", error);
      }
    }
    fetchDates();
  }, [token, currentAppraisal.property_id]);

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

  //entra al form de edición
  const editEstate = () => {
    navigate(`/admin/editEstate/${appraisal.property_id}`);
  }

  //entra a la vista de la info Vivienda ???????
  const onClickProperty = () => {
    navigate(`/admin/infoVivienda/${appraisal.property_id}`);
  }

  const handleChange = (e) => {
    const {name, checked} = e.target;
    const updated = {...currentAppraisal, [name]: checked};
    setCurrentAppraisal(updated);

    onSubmit(updated);
  }

  //modificación de los checkbox
  const onSubmit = async(updatedProperty) => {

    try {
      const data = {
        is_disabled: Boolean(updatedProperty.is_disabled),
        property_id: updatedProperty.property_id
      };

      const res = await fetchData(`/admin/editAppraisalStatus/${currentAppraisal.property_id}`, "PUT", data, token);
      console.log(res);

      if(res.status === 200) {
        onUpdate(updatedProperty);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="card-editProperties-phone p-3 border rounded bg-white shadow-sm">
      <Row className="align-items-start g-3">
        <Col xs={12} md={6} lg={4} className="text-center">
          <div onClick={onClickProperty} style={{ cursor: 'pointer' }}>
            <img
              src="/images/bg/bg-Home.jpg"
              alt="Vivienda"
              className="img-fluid rounded"
            />
            <strong className="d-block mt-2">{currentAppraisal.title}</strong>

            <div
              className={`text-white fw-bold px-2 py-1 mt-1 rounded ${
                currentAppraisal.is_reserved == 0
                  ? 'card-price-blue'
                  : 'card-price-red'
              }`}
            >
            <p className="mb-0 small">VALORACIÓN</p>
            <p className="mb-0">
              {Number(currentAppraisal.price).toLocaleString('es-ES', {
                useGrouping: true
              })} €
            </p>
            </div>
          </div>
        </Col>

        {/* Información de dirección y fechas */}
        <Col xs={12} md={6} lg={8}>
          <div className="d-flex gap-2 justify-content-around ps-md-3">
            <div className="d-flex flex-column gap-2 ps-md-3">
              <p className="mb-0 text-truncate">
                {currentAppraisal.type_via} {currentAppraisal.street_name}{' '}
                {currentAppraisal.street_number}
              </p>
              {currentAppraisal.locality && (
                <p className="mb-0">
                  <strong>Localidad:</strong> {currentAppraisal.locality}
                </p>
              )}
              {currentAppraisal.city && (
                <p className="mb-0">
                  <strong>Ciudad:</strong> {currentAppraisal.city}
                </p>
              )}
              <InfoCard property={currentAppraisal} />
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
                title={currentAppraisal.title}
              />
            )}
          </div>
        </Col>
      </Row>

      {/* Checkboxes */}
      <Row className="mt-3">
        <Col xs={12}>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Form.Check
              name="is_disabled"
              type="checkbox"
              label="Eliminada"
              checked={currentAppraisal.is_disabled}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>

      {/* Botón Editar */}
      <Row className="mt-3">
        <Col className="text-center">
          <button type="button" onClick={editEstate} className="btn-1">
            Editar
          </button>
        </Col>
      </Row>
    </section>
  );
}

