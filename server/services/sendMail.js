import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //este es el host de gmail
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'idea6324@gmail.com',
    pass: 'mkqawtcruyeoxlsm',
  },
});


export const sendNewUSerMail = (name, email, password) => {
  let emailBody = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a IdeaCasa</title>
</head>
<body>
  <main>
    <h2>Hola ${name},</h2>
    <br>
    <p>Es un placer darte la bienvenida al equipo de IdeaCasa. A partir de ahora podrás acceder a nuestra plataforma con las siguientes credenciales:</p>
    <ul>
      <li>Correo: ${email}</li>
      <li>Contraseña: ${password}</li>
    </ul>
    <p>Te recomendamos cambiar tu contraseña en tu primer inicio de sesión para mantener la seguridad de tu cuenta.</p>
    <p>Si tienes cualquier duda o inconveniente al acceder, no dudes en ponerte en contacto con el área de soporte o con tu responsable directo.</p>
    <p>Estamos encantados de contar contigo y confiamos en que tu experiencia con IdeaCasa será enriquecedora.</p>
    <br>
    <p>Un cordial saludo,</p>
    <p>Equipo de Administración de IdeaCasa</p>
  </main>
</body>
</html>`;

  transporter.sendMail({
    from: "'IdeaCasa' <idea6324@gmail.com>",
    to: email,
    subject: 'Bienvenido a IdeaCasa',
    text: `Este es tu nuevo usuario`,
    html: emailBody,
  });

  
};

const formatRemodeled = (val) => {
  if (val === true || val === 'true') return 'Sí';
  if (val === false || val === 'false') return 'No';
  return;
};
export const sendNewAssesmentMail = (dataAssesment) => {
  const {
    user_name,
    user_last_name,
    email,
    user_phone,
    bedrooms,
    toilets,
    catastral_reference,
    remodeled,
    type_via,
    street_name,
    street_number,
    block,
    stairs,
    floor,
    door,
    zip_code,
    city,
    municipality,
    locality,
    urbanization,
    street_observation,
  } = dataAssesment;

  let adminTemplate = `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Valoración vivienda</title>
        </head>
        <body>
        <main style="font-size:200px">
                  <div class="container">

        <h2>¡Hola,<span style=" color: blue;"> IdeaCasa!</span></h2>
        <br>
        <p>¡Tienes una nueva valoración de vivienda!</p>
        <p>El mensaje recibido desde el formulario de valoración de vivienda de tu sitio web,
          contiene los siguientes datos:</p>

      
            <h3><span style="padding-inline: 3rem;">Datos personales</span></h3>
            <p><span style="font-weight: bolder;">Nombre:</span> ${user_name}</p>
            <p><span style="font-weight: bolder;">Apellidos: </span>${user_last_name}</p>
            <p><span style="font-weight: bolder;">Email:</span> ${email}</p>
            <p><span style="font-weight: bolder;">Teléfono:</span> ${user_phone}</p>
         <hr>
          <div>
            <h3>Datos necesarios</h3>
            <p><span style="font-weight: bolder;">Habitaciones:
              </span>${bedrooms}</p>
            <p><span style="font-weight: bolder;">Baños:</span> ${toilets}</p>
            <p><span style="font-weight: bolder;">Referencia Catastral:</span>
              ${catastral_reference}</p>
            <p><span>Reformado:</span> ${formatRemodeled(remodeled)}</p></span>
          </div>
          <hr>
        </div>

        <div>
          <h3>Dirección</h3>
          <p><span style="font-weight: bolder;">Tipo de vía:</span> ${type_via}
          </p>
          <p><span style="font-weight: bolder;">Nombre de vía:
            </span>${street_name}</p>
          <p><span style="font-weight: bolder;">Número:</span> ${street_number}
          </p>
          <p><span style="font-weight: bolder;">Bloque:</span> ${block}</p>
          <p><span style="font-weight: bolder;">Escalera:</span> ${stairs}</p>
          <p><span style="font-weight: bolder;">Planta:</span> ${floor}</p>
          <p><span style="font-weight: bolder;">Puerta:</span> ${door}</p>
          <p><span style="font-weight: bolder;">C.P.:</span> ${zip_code}</p>
          <p><span style="font-weight: bolder;">Ciudad:</span> ${city}</p>
          <p><span style="font-weight: bolder;">Municipio:</span>
            ${municipality}</p>
          <p><span style="font-weight: bolder;">Localidad:</span> ${locality}
          </p>
          <p><span style="font-weight: bolder;">Urbanización:</span>
            ${urbanization}</p>
          <p><span style="font-weight: bolder;">Observaciones:</span>
            ${street_observation}</p>
        </div>

        <p style="font-size:12px; color:#555; margin-top:20px;">
          Este correo fue generado automáticamente desde el formulario de
          solicitud de valoración.
        </p>
      </div>
    </main>
</body>
</html>`;

    const userTemplate = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud recibida</title>
  </head>
  <body>
    <main>
      <h2>Hola ${user_name},</h2>
      <p>¡Gracias por enviar tu solicitud de valoración con <b>IdeaCasa</b>!</p>
      <p>Hemos recibido correctamente la información sobre tu vivienda. Nuestro equipo la revisará y se pondrá en contacto contigo lo antes posible.</p>
      <p>Estos son algunos de los datos que nos has proporcionado:</p>

      <ul>
        <li><b>Dirección:</b> ${type_via} ${street_name}, Nº ${street_number}</li>
        <li><b>Ciudad:</b> ${city}</li>
        <li><b>Habitaciones:</b> ${bedrooms}</li>
        <li><b>Baños:</b> ${toilets}</li>
        <li><b>Reformado: ${formatRemodeled(remodeled)}</b></li>
      </ul>      

      <br>
      <p>Un saludo,<br><b>Equipo de IdeaCasa</b></p>
    </main>
  </body>
  </html>`;

  transporter.sendMail({
    from: "'IdeaCasa' <idea6324@gmail.com>",
    to: `idea6324@gmail.com`,
    subject: '📩 Nueva solicitud de valoración',
    text: `solicitud valoración`,
    html: adminTemplate,
  });

  transporter.sendMail({
    from: "'IdeaCasa' <idea6324@gmail.com>",
    to: email,
    subject: '✅ Hemos recibido tu solicitud de valoración',
    text: `Recibimos con éxito su solicitud de valoración`,
    html: userTemplate,
  });

  
};

export const sendNewPasswordMail = (email, token) => {
  let emailBody = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cambiar la contraseña</title>
</head>
<body>
  <h2>Pulsa este enlace para cambiar tu contraseña</h2>
  <a href="http://localhost:5173/changePassword/${token}">Cambiar contraseña</a>
</body>
</html>`;

  transporter.sendMail({
    from: "'IdeaCasa' <idea6324@gmail.com>",
    to: email,
    subject: 'Cambia tu contraseña',
    text: `Enlace para cambiar la contraseña`,
    html: emailBody,
  });

  
};
