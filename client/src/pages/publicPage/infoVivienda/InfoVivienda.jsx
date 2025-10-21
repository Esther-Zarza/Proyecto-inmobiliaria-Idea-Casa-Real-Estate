import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BtnLink from '../../../components/btnLink/BtnLink';
import './infoVivienda.css';
import InfoCard from '../../../components/Card/CardVivienda/components/InfoCard';
import Map from '../../../components/map/Map';
import { FormContact } from '../../../components/forms/FormContact/FormContact';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { ModalPlanos } from '../../../components/modals/modalsPlans/ModalPlanos';
import { Col, Container, Row } from 'react-bootstrap';
import { CardContactSmall } from '../../../components/Card/cardContactSmall/CardContactSmall';

const InfoVivienda = () => {
  const { property_id } = useParams();
  const { handleFavourite, favourites, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const [equipment, setEquipment] = useState({});
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [imgActual, setImgActual] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetchData(`/getPropertyById/${property_id}`, 'GET');
        const equipamentFetch = await fetchData(`/getEquipment/${property_id}`, 'GET');
        if (equipamentFetch.status === 200) setEquipment(equipamentFetch.data || {});
        if (res.data?.property?.length > 0) setProperty(res.data.property[0]);
      } catch (error) {
        console.log('Error al cargar la vivienda', error);
      }
    };
    if (property_id) fetchProperty();
  }, [property_id]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await fetchData(`/admin/getFiles/${property_id}`, 'GET');
        setFiles(res.data.files);
      } catch (error) {
        console.log('Error al traer los archivos', error);
      }
    };
    getFiles();
  }, [property_id]);

  const isFavourite = favourites.includes(property.property_id);

  const images = files?.length > 0
    ? files.filter(f => f.file_type === 1)
      .map(f => `${import.meta.env.VITE_SERVER_IMAGES}/propiedades/${f.filename}`)
    : ['/images/bg/bg-form.jpg', '/images/bg/bg-Home.jpg'];

  const handleOnClickImageSiguiente = () =>
    setImgActual((prev) => (prev + 1) % images.length);
  const handleOnClickImageAnterior = () =>
    setImgActual((prev) => (prev - 1 + images.length) % images.length);
  const handleOnClickImage = (i) => setImgActual(i);

  const scrollToMap = () => {
    const el = document.getElementById('map-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const fechaRaw = property?.last_edit_date || property?.create_date;
  const fechaActualizacionFmt = fechaRaw
    ? new Date(`${fechaRaw}T00:00:00`).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const ENERGY = {
    1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E',
    6: 'F', 7: 'G', 8: 'En trámite', 9: 'No especificado', 10: 'Exento',
  };

  const typeCodeMap = { 1: 'VL', 2: 'VT', 3: 'AL', 4: 'ON' };
  const typeCode = typeCodeMap[property?.property_type] ?? 'PR';
  const reference = property?.property_id
    ? `IC-${typeCode} ${property.property_id}` : 'IC-PR -';
  const estadoComercial = property?.property_type === 4
    ? 'Obra nueva' : 'Segunda mano';

  return (
    <Container fluid className="info-vivienda me-lg-5 ps-lg-5">
      {(user?.user_type === 1 || user?.user_type === 0) && (
        <button
          className="btn-1 btn-edit-infovivienda"
          onClick={() => navigate(`/admin/editEstate/${property.property_id}`)}
        >
          Editar Vivienda
        </button>
      )}

      {(user?.user_type === 2) && (
        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn-1 btn-edit-infovivienda"
            onClick={() => navigate(`/user/misInmuebles`)}
          >
            Volver a Mis Propiedades
          </button>
          <button
            className="btn-1 btn-edit-infovivienda"
            onClick={() => navigate(`/user/editPropierties/${property.property_id}`)}
          >
            Administrar archivos
          </button>
        </div>
      )}

      <div className="p-5 text-center px-2">
        {show && <ModalPlanos show={show} setShow={setShow} files={files} />}
        <h2>{property?.title ?? 'Vivienda'}</h2>

        <div className="d-flex justify-content-center flex-wrap gap-2">
          <BtnLink icon="bi-geo-alt" text="Ver mapa" onClick={scrollToMap} />
          <BtnLink
            icon={isFavourite ? 'bi-heart-fill' : 'bi-heart'}
            text="Guardar favorito"
            iconClass={`icon-fav ${isFavourite ? 'active' : ''}`}
            onClick={() => handleFavourite(property?.property_id)}
            className="icon-fav"
            
          />
          <BtnLink icon="bi-play-circle" text="Video" link="/" />
          <BtnLink icon="bi-house" text="Planos" onClick={() => setShow(true)} />
          
        </div>
      </div>

      <div className="container-xl ">
        <div id="propertyCarousel" className="carousel slide">
          <div className="carousel-inner rounded-3 overflow-hidden shadow carousel-container">
            {images.map((src, i) => (

              <div key={i} className={`carousel-item ${i === imgActual ? 'active' : ''}`}>
                <img src={src} className="d-block w-100 carousel-img" alt={`Foto ${i + 1}`} />
              </div>              
            ))}
          </div>


          <button className="carousel-control-prev" type="button" onClick={handleOnClickImageAnterior}>
            <span className="carousel-control-prev-icon bg-dark rounded-circle p-2"></span>
          </button>
          <button className="carousel-control-next" type="button" onClick={handleOnClickImageSiguiente}>
            <span className="carousel-control-next-icon bg-dark rounded-circle p-2"></span>
          </button>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => handleOnClickImage(i)}
              className={`border-0 bg-transparent p-0 thumbnail-btn ${i === imgActual ? 'thumbnail-active' : ''}`}
            >
              <img src={src} alt={`Miniatura ${i + 1}`} className="thumbnail-img" />
            </button>
          ))}
        </div>

        <div className="contacto">
          <CardContactSmall />
        </div>

        <div className="d-flex justify-content-between align-items-center p-2 fondoAzul mt-4 flex-wrap text-center text-lg-start">
          <span className="text-white fs-4">
            {property?.price ? `${Number(property.price).toLocaleString('es-ES', {useGrouping: true})} €` : ''}
          </span>
          <InfoCard property={property} color="white" />
          <span className="text-white fs-5">
            {property?.ibi ? `${Number(property.ibi).toLocaleString('es-ES', {useGrouping: true})} € IBI` : ''}
          </span>
        </div>

        <div className="descripcion-vivienda text-start py-4 px-4">
          <p>{property?.description}</p>
        </div>

        <div className="text-start mt-2">
          <h2>Características</h2>
          <hr />
          <Row className="mt-4 gy-4">
            <Col xs={12} md={6} lg={4}>
              <ul className="list-unstyled">
                <li><span>Ref:</span> {reference}</li>
                <li><span>Superficie:</span> {property?.registry_surface} m²</li>
                <li><span>Habitaciones:</span> {property?.bedrooms}</li>
                <li><span>Baños:</span> {property?.toilets}</li>
                <li>{estadoComercial}</li>
                <li><span>Año:</span> {property?.year_built}</li>
              </ul>
            </Col>

            <Col xs={12} md={6} lg={8}>
              <Row>
                <Col xs={6} md={4}>
                  {Boolean(equipment?.equipment?.bbq) && <p><i className="bi bi-fire feature-icon me-2"></i> Barbacoa</p>}
                  {Boolean(equipment?.equipment?.air_conditioning) && <p><i className="bi bi-snow feature-icon me-2"></i> Aire acondicionado</p>}
                  {Boolean(equipment?.equipment?.alarm) && <p><i className="bi bi-bell feature-icon me-2"></i> Alarma</p>}
                  {Boolean(equipment?.equipment?.high_standing) && <p><i className="bi bi-stars feature-icon me-2"></i> Alto standing</p>}
                  {Boolean(equipment?.equipment?.built_in_wardrobes) && <p><i className="bi bi-box-seam feature-icon me-2"></i> Armarios empotrados</p>}
                </Col>
                <Col xs={6} md={4}>
                  {Boolean(equipment?.equipment?.sea_views) && <p><i className="bi bi-water feature-icon me-2"></i> Vistas al mar</p>}
                  {Boolean(equipment?.equipment?.chimney) && <p><i className="bi bi-fire feature-icon me-2"></i> Chimenea</p>}
                  {Boolean(equipment?.equipment?.garden) && <p><i className="bi bi-tree feature-icon me-2"></i> Jardín</p>}
                  {Boolean(equipment?.equipment?.parking) && <p><i className="bi bi-car-front feature-icon me-2"></i> Parking</p>}
                  {Boolean(equipment?.equipment?.private_pool) && <p><i className="bi bi-water feature-icon me-2"></i> Piscina privada</p>}
                </Col>
                <Col xs={6} md={4}>
                  {Boolean(equipment?.equipment?.terrace) && <p><i className="bi bi-umbrella feature-icon me-2"></i> Terraza</p>}
                  {Boolean(equipment?.equipment?.storage_room) && <p><i className="bi bi-box feature-icon me-2"></i> Trastero</p>}
                  {Boolean(equipment?.equipment?.sunny) && <p><i className="bi bi-sun feature-icon me-2"></i> Soleado</p>}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <section className="my-5 text-start">
          <h2 className="mb-3">Información</h2>
          <hr />
          <Row className="align-items-center gy-4">
            <Col xs={12} md={6}>
              <h5 className="mt-3 mb-3">Certificado energético</h5>
              <ul>
                {property?.energ_qualification && (
                  <li>
                    Clasificación energética:{' '}
                    <strong>{ENERGY[property.energ_qualification]}</strong>
                  </li>
                )}
                {property?.energ_certification && (
                  <li>
                    Certificado de emisión:{' '}
                    <strong>{ENERGY[property.energ_certification]}</strong>
                  </li>
                )}
              </ul>
              {fechaActualizacionFmt && (
                <>
                  <h5 className="fw-semibold mt-5">Última actualización</h5>
                  <p className="text-muted">{fechaActualizacionFmt}</p>
                </>
              )}
            </Col>
            <Col xs={12} md={6} className="text-center">
              <img
                className="certificado-energetico img-fluid"
                src="/images/mapas/energetico.png"
                alt="Certificados energéticos"
              />
            </Col>
          </Row>
        </section>

        <section id="map-section" className="my-5">
          <Row className="gy-5">
            <Col xs={12} lg={6}>
              <h2 className="mb-4 text-center">Localización</h2>
              <hr />
              <div className="map-wrap rounded-3 overflow-hidden w-100">
                {property ? (
                  <Map
                    direccion={{
                      type_via: property.type_via,
                      street_name: property.street_name,
                      street_number: property.street_number,
                      municipality: property.municipality,
                      city: property.city,
                      zip_code: property.zip_code,
                    }}
                  />
                ) : (
                  <p>Cargando mapa...</p>
                )}
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <h2 className="mb-4 text-center">¡Contacta con nosotros!</h2>
              <hr />
              <FormContact />
            </Col>
          </Row>
        </section>
      </div>
    </Container>
  );
};

export default InfoVivienda;
