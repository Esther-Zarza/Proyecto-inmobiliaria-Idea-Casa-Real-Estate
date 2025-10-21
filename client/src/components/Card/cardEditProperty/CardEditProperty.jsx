import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CardEditProperty.css'
import { Form } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import InfoCard from '../CardVivienda/components/InfoCard';
import { ModalDates } from '../../modals/modalsDate/ModalDates';

export const CardEditProperty = ({property, onUpdate}) => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentProperty, setCurrentProperty] = useState({
    ...property,
    is_public: Boolean(property.is_public),
    is_disabled: Boolean(property.is_disabled),
    is_reserved: Boolean(property.is_reserved)
  });
  const [agreementDate, setAgreementDate] = useState([]);
  const [showModalDates, setShowModalDates] = useState(false);

  const [file,setFile] = useState({});

  useEffect(()=>{
    const fetchDates = async() => {
      try {
        const res = await fetchData(`/admin/getDates/${currentProperty.property_id}`, 'GET', currentProperty.property_id, token);

        if(res.data.dates){
          setAgreementDate(res.data.dates);
        }
      } catch (error) {
        console.log("Error trayendo fecha del acuerdo", error);
      }
    }
    fetchDates();
  }, [token, currentProperty.property_id]);

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
    navigate(`/admin/editEstate/${property.property_id}`);
  }

  //entra a la vista de la info Vivienda
  const onClickProperty = () => {
    navigate(`/admin/infoVivienda/${property.property_id}`);
  }

  const handleChange = (e) => {
    const {name, checked} = e.target;
    const updated = {...currentProperty, [name]: checked};
    setCurrentProperty(updated);

    onSubmit(updated);
  }

  //modificación de los checkbox
  const onSubmit = async(updatedProperty) => {

    try {
      const data = {
        is_public: Boolean(updatedProperty.is_public), 
        is_disabled: Boolean(updatedProperty.is_disabled),
        is_reserved: Boolean(updatedProperty.is_reserved),
        property_id: updatedProperty.property_id
      };

      const res = await fetchData(`/admin/editPropertyStatus/${currentProperty.property_id}`, "PUT", data, token);
      console.log(res);

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
        const res = await fetchData(`/admin/getFile/${property.property_id}`,"GET", null);
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
          className={
            currentProperty.is_reserved == 0 ?
              'card-price-blue d-flex flex-column gap-2'
              :
              'card-price-red d-flex flex-column gap-2'
          }
          onClick={onClickProperty}
        >
          <p>
            {currentProperty.is_reserved && "RESERVADO"}
            {!currentProperty.is_reserved &&
              currentProperty.property_type=== 2 && "EN VENTA"
            }
            {!currentProperty.is_reserved &&
              currentProperty.property_type=== 3 && "ALQUILER"
            }
            {!currentProperty.is_reserved &&
              currentProperty.property_type=== 4 && "OBRA NUEVA"
            }
          </p>
          <p>
            {Number(currentProperty.price).toLocaleString('es-ES', {
              useGrouping: true
            })} €
          </p>
        </div>
      </div>
        <div className=' card-body d-flex justify-content-between align-items-center gap-4 me-3'>
          <div className='title-edit'>
            <p className='fw-bold'>{currentProperty.title}</p>
            <InfoCard property={currentProperty} />
            <p>Ref. Catastral: {currentProperty.catastral_reference}</p>
          </div>
          <div className='address-edit'>
            <p className='address-truncated'>{currentProperty.type_via} {currentProperty.street_name} {currentProperty.street_number}</p>
            {currentProperty.locality &&
              <p><span className="fw-bold">Localidad: </span> {currentProperty.locality}</p>
            }
            {currentProperty.municipality &&
              <p><span className="fw-bold">Municipio: </span>{currentProperty.municipality}</p>
            }
          </div>
          <div>
            <p className='fw-bold'>Fecha del acuerdo:</p>
            {agreementDate?.length > 0 && (
              <div className='d-flex flex-column justify-content-end'>
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
                title={currentProperty.title}
              />
            )}
          </div>
          <div className='d-flex flex-column gap-2 align-items-center m-2'>
            <div className='card-check'>
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
            <div>
              <button
                onClick={editEstate}
                className='btn-1 btn-editar'
              >Editar</button>
            </div>
          </div>
        </div>
    </div>
  )
}

