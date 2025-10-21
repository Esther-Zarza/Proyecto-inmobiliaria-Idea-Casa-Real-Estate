import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modalprivacity } from '../../modals/modalsFooter/Modalprivacity';
import { LegalNotice } from '../../modals/modalsFooter/LegalNotice';
import { CookiePolicy } from '../../modals/modalsFooter/CookiePolicy';
import './footerUser.css';

export const FooterUser = () => {
  const [showModalPrivacy, setShowModalPrivacy] = useState(false);
  const [showModalLegal, setShowModalLegal] = useState(false);
  const [showModalCookie, setShowModalCookie] = useState(false);

  const navigate = useNavigate();

  return (
    <footer className="footerUser">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="/images/logos/logo-footer.jpg"
            alt="ideaCasa logo"
            className="footer-logo-img"
            onClick={()=>navigate('/')}
          />
        </div>

        <div className="footer-section">
          <div className="d-flex flex-column gap-2">
            <h4>INFORMACIÓN DE CONTACTO</h4>
            <Link to="/user/#formcontacto">
              Nuestras oficinas
            </Link> 
            <Link to="/user//#formcontacto">
              Formulario de contacto
            </Link> 
          </div>

          <div className="social-icons d-flex gap-3">
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
        </div>
        {/* Links de ayuda */}
        <div className="footer-section gap-2">
          <h4>LINKS DE AYUDA</h4>
          <Link as={Link} to="/user/inmuebles" className="link">
            Inmuebles
          </Link>
          <Link as={Link} to="/user/misInmuebles" className="link">
            Mis propiedades
          </Link>

          <Link to="/user//#formcontacto">
            Contacto
          </Link>           
        </div>

        <div className="footer-section gap-2">
          <h4>LEGAL</h4>

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
          
        </div>
      </div>
      <div className="footer-bottom">© Copyright 2025 All rights reserved</div>
    </footer>
  );
};
