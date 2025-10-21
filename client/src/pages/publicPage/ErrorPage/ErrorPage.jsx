import React from 'react';
// import sleepingImage from './sleeping.svg'; // Asegúrate de tener esta imagen en tu proyecto

const ErrorPage = () => {
  return (
    <div className='d-flex flex-column  align-items-center'>
      <h1>¡Ups! Algo salió mal...</h1>
      <p>La búsqueda no obtuvo ningún resultado</p>
      <ul>
        Sugerencias:
        <li>Comprueba que todas las palabras están escritas correctamente. </li>
        <li>Intenta usar otras palabras.</li>
        <li>Intenta usar palabras más generales.</li>
      </ul>
      <img
        className="mt-5"
   
        src="/images/error/error.jpg"
        alt="Imagen de error, mostrando un cohete y un 404"
      />
    </div>
  );
};

export default ErrorPage;
