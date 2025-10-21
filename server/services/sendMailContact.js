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

export const sendMailContact = (data) => {
  const { name, lastName, phone, contactType, details, email } = data;
  let emailBody = `<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >
    <title>Nueva petición de contacto</title>
  </head>

  <body>
    <main style="font-size:30px">
      <h2>¡Hola,<span style=" color: blue;"> IdeaCasa!</span></h2>
      <br>
      <p>¡Tienes una nueva solicitud para <span style="font-weight:bolder;"> ${contactType}!</span></p>
      <p>El mensaje recibido desde el formulario de contacto de tu sitio web,
        contiene los siguientes datos de contacto:
      <div>
      <span style="font-weight: bolder;">- Tipo de servicio
         </span> ${contactType}
        <br>
        <span style="font-weight: bolder;">- Nombre:</span> ${name}
        <br>
        <span style="font-weight: bolder;">- Apellidos:</span> ${lastName}
        <br>
        <span style="font-weight: bolder;">- Correo electrónico:</span> ${email}
        <br>
        <span style="font-weight: bolder;">- Teléfono:</span> ${phone}
        <br>
        <span style="font-weight: bolder;">- Detalles del asunto:</span> ${details}
      </div>
      Por favor, responde a la brevedad si es necesario.</p>
    </main>
  </body>

</html>`

/* MIRAR MENSAJES DE ERROR SI FALLA ARRIBA */
  transporter.sendMail({
    from: "'IdeaCasa' <idea6324@gmail.com>",
    to: 'idea6324@gmail.com',
    subject: 'Nueva petición de contacto',
    text: `Nueva petición de contacto`,
    html: emailBody,
  });

  
};
