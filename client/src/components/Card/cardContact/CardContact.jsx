import React from 'react';
import './cardContact.css';
import { Link } from 'react-router-dom';

export const CardContact = () => {
  const address = 'Ctra. de Coín, 74, 29140 Churriana, Málaga';
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&z=16&output=embed`;

  return (
    <div className="card-contact">
      <div className="data-contact">
        <h3 className="text-center pt-3 pb-3">Datos de contacto</h3>
        <p>
          <i className="bi bi-telephone-fill"></i>
          <a href="tel:951995959">951995959</a>
        </p>
        <p>
          <i className="bi bi-envelope-fill"></i>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=info@ideacasa.es&su=Consulta&body=Hola%2C%20quiero%20más%20información."
            target="_blank"
            rel="noopener noreferrer"
          >
            info@ideacasa.es
          </a>
        </p>
        <p>
          <i className="bi bi-geo-alt-fill"></i> {address}
        </p>
        <div className="d-flex gap-3">
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
            <i className="bi bi-youtube"></i>
          </Link>
        </div>
      </div>

      {/* Solo el mapa, sin botones */}
      <div className="contact-map pt-2">
        <iframe
          src={mapsEmbed}
          title="Ubicación oficina IdeaCasa"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
