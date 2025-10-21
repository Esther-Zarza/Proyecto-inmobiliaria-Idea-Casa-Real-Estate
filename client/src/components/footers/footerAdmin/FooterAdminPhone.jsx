import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Modalprivacity } from '../../modals/modalsFooter/Modalprivacity';
import { LegalNotice } from '../../modals/modalsFooter/LegalNotice';
import { CookiePolicy } from '../../modals/modalsFooter/CookiePolicy';
import './footerAdminPhone.css'
import { Link, useNavigate } from 'react-router-dom';


export const FooterAdminPhone = () => {
  const [showModalPrivacy, setShowModalPrivacy] = useState(false);
  const [showModalLegal, setShowModalLegal] = useState(false);
  const [showModalCookie, setShowModalCookie] = useState(false);
    const navigate = useNavigate();

  return (
    <footer className="footerPhoneAdmin pt-5">
      <Row xl={2}>
        <Col xl={12} className="d-flex justify-content-center gap-5">
          <Col xl={6} className="d-flex flex-column gap-2">
            <span>LEGAL</span>
            <div
              onClick={() => setShowModalPrivacy(!showModalPrivacy)}
              className="link"
            >
              Política de privacidad
            </div>
            {showModalPrivacy && (
              <Modalprivacity setShowModalPrivacy={setShowModalPrivacy} />
            )}
            <div
              onClick={() => setShowModalLegal(!showModalLegal)}
              className="link"
            >
              Aviso legal
            </div>
            {showModalLegal && (
              <LegalNotice setShowModalLegal={setShowModalLegal} />
            )}
            <div
              onClick={() => setShowModalCookie(!showModalCookie)}
              className="link"
            >
              Política de Cookies
            </div>
            {showModalCookie && (
              <CookiePolicy setShowModalCookie={setShowModalCookie} />
            )}
            
          </Col>
          <Col xl={6} className="d-flex flex-column gap-2 ">
            <span>LINKS DE AYUDA</span>
            <Link as={Link} to='/admin/inmuebles' className="link">
              Inmuebles
            </Link>
              <Link as={Link} to='/admin/addEstate' className="link">
             Crear Propiedad
            </Link>
            
            <Link to="admin/#formcontacto" className="link">
              Contacto
            </Link> 
          </Col>
        </Col>
        <Col xl={12} className="d-flex justify-content-center py-3">
          <div className="icons-phone d-flex gap-3">
            <Link
              to="https://www.facebook.com/ideacasa.inmo.malaga"
              target="_blank"
            >
              <i className="bi bi-facebook"></i>
            </Link>
            <Link
              to="https://www.instagram.com/ideacasainmobiliaria/"
              target="_blank"
            >
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="https://x.com/infoideacasa" target="_blank">
              <i className="bi bi-twitter-x"></i>
            </Link>
            <Link
              to="https://youtube.com/@ideacasainmobiliaria6803?si=ZTUQ9ftQReHMgEGg"
              target="_blank"
            >
              <i className="icons bi bi-youtube"></i>
            </Link>
          </div>
        </Col>
      </Row>

      <div className="footer-logo-phone py-4 d-flex  flex-column justify-content-center align-items-center">
        <img
          src="/images/logos/logo-navbar.png"
          alt="ideaCasa logo"
          className="footer-logo-img-phone"
          onClick={()=>navigate('/')}
        />
        <div className="footer-bottom-phone mt-2">
          © Copyright 2025 All rights reserved
        </div>
      </div>
    </footer>
  );
};
