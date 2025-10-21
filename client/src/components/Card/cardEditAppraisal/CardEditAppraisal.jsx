import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CardEditAppraisal.css'
import { Form } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import InfoCard from '../CardVivienda/components/InfoCard';
import { ModalDates } from '../../modals/modalsDate/ModalDates';

export const CardEditAppraisal = ({appraisal, onUpdate}) => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentAppraisal, setCurrentAppraisal] = useState(appraisal);
  const [agreementDate, setAgreementDate] = useState([]);
  const [showModalDates, setShowModalDates] = useState(false);

  const [file,setFile] = useState({});

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
      

      if(res.status === 200) {
        onUpdate(updatedProperty);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
      const getFile = async() => {
        try {
          const res = await fetchData(`/admin/getFile/${currentAppraisal.property_id}`,"GET", null);
          setFile(res.data.file[0]);
  
        } catch (error) {
          console.log("Error al traer los archivos", error)
        }
      }
  
      getFile();
  
    },[]);

  return (
    <div className='card-editProperties d-flex'>
      <div className='card-image'>
        {file ? 
          <img
          // src={`${import.meta.env.VITE_SERVER_IMAGES}/poperty`}
          src={`${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${file.filename}`}
          alt=""
          onClick={onClickProperty}
        />
        :
          <img
          // src={`${import.meta.env.VITE_SERVER_IMAGES}/poperty`}
          src='/images/bg/bg-Home.jpg'
          alt=""
          onClick={onClickProperty}
        />}
        <div 
          className= 'card-price-blue d-flex flex-column gap-2'
          onClick={onClickProperty}
        >
          <p>
            VALORACIÓN
          </p>
          <p>
          {Number(currentAppraisal.price).toLocaleString('es-ES', {
            useGrouping: true
          })} €
          </p>
          
        </div>
      </div>
        <div className='card-body d-flex justify-content-between align-items-center gap-4 me-3'>
          <div className='title-edit'>
            <p className='fw-bold'>{currentAppraisal.title}</p>
            <InfoCard property={currentAppraisal} />
            <p>Ref. Catastral: {currentAppraisal.catastral_reference}</p>
          </div>
          <div className='address-edit'>
            <p className='address-truncated'>{currentAppraisal.type_via} {currentAppraisal.street_name} {currentAppraisal.street_number}</p>
            {currentAppraisal.locality &&
              <p><span className="fw-bold">Localidad: </span> {currentAppraisal.locality}</p>
            }
            {currentAppraisal.municipality &&
              <p><span className="fw-bold">Municipio: </span>{currentAppraisal.municipality}</p>
            }
          </div>
          <div>
            <p className='fw-bold'>Fecha del acuerdo:</p>
            {agreementDate?.length > 0 && (
              <div>
                <p>
                  {last.start_date ? `Inicio: ${formatDate(last.start_date)}`: 'Sin fecha de acuerdo'}
                </p>
                <p>
                  {last.end_date && `Fin: ${formatDate(last.end_date)}`}
                </p>
                <button 
                  className='btn-2 btn-dates'
                  onClick={()=>setShowModalDates(!showModalDates)}
                >Registro de fechas</button>
              </div>
            )}
            {showModalDates && (
              <ModalDates
                setShowModalDates={setShowModalDates} 
                agreementDate={agreementDate}
                title={currentAppraisal.title}
              />
            )}
          </div>
          <div className='d-flex flex-column gap-3 align-items-center'>
            <div className='card-check'>
              <Form.Check
                name="is_disabled"
                type="checkbox"
                label="Eliminada"
                checked={currentAppraisal.is_disabled}
                onChange={handleChange}
              />
            </div>
            <button 
              onClick={editEstate}
              className='btn-1 btn-editar'
            >Editar</button>
          </div>
        </div>
    </div>
  )
}

