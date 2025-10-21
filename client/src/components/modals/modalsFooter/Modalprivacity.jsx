import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './modalprivacity.css';

export const Modalprivacity = ({ setShowModalPrivacy }) => {
  return (
    <div className="modal-overlay-privacity">
      <Modal.Dialog className="modal-content-privacity">
        <Modal.Header
          closeButton
          className='closeButton'
          onClick={() => setShowModalPrivacy(false)}
        ></Modal.Header>
        <Modal.Body className="modal-body-privacity">
          <h2 className="text-center pb-4">Política de privacidad </h2>
          <hr />
          <div>
            <span>DATOS DEL RESPONSABLE DEL TRATAMIENTO </span>
            <br />
            <span>RAZÓN SOCIAL: </span>IDEACASA REAL ESTATE, S.L. (en adelante,
            la “Empresa” o el “Responsable”). <br />
            <span>CIF:</span> B93637080 <br />
            <span>DOMICILIO: </span>Carretera de Coín, nº 74 – 29140 – Málaga
            <br />
            <span>Teléfono: </span>951995959 <br />
            <span>
              Email para comunicaciones en materia de Protección de datos:{' '}
            </span>
            info@ideacasa.es
            <hr />
            <span>1.1. Normativa aplicable</span> <br />
            Nuestra Política de Privacidad se ha diseñado de acuerdo con el
            <span>
              {' '}
              Reglamento General de Protección de Datos de la UE 2016/679 del
              Parlamento Europeo y del Consejo
            </span>
            , de 27 de abril de 2016, relativo a la protección de las personas
            físicas en lo que respecta al tratamiento de datos personales y a la
            libre circulación de estos datos y por el que se derogala Directiva
            95/46/CE (Reglamento general de protección de datos), y en lo que no
            contradiga el mencionado Reglamento, por lo dispuesto en el marco
            legislativo español en materia de Protección de Datos de Carácter
            Personal. <br />
            Al facilitarnos sus datos, Usted declara haber leído y conocer la
            presente Política de Privacidad, prestando su consentimiento
            inequívoco y expreso al tratamiento de sus datos personales de
            acuerdo a las finalidades y términos aquí expresados. <br />
            La Empresa podrá modificar la presente Política de Privacidad para
            adaptarla a las novedades legislativas, jurisprudenciales o de
            interpretación de la Agencia Española de Protección de Datos. Estas
            condiciones de privacidad podrán ser complementadas por el Aviso
            Legal, Política de Cookies y las Condiciones Generales que, en su
            caso, se recojan para determinados productos o servicios, si dicho
            acceso supone alguna especialidad en materia de protección de datos
            de carácter personal.
            <br />
            <br />
            <span>1.2. Delegado de Protección de Datos </span> <br />
            La empresa no tiene Delegado de Protección de Datos. <br />
            <span>FINALIDAD DEL TRATAMIENTO DE LOS DATOS PERSONALES</span>{' '}
            <br />
            El tratamiento que realizamos de sus datos personales responde a las
            siguientes finalidades: <br />– Proporcionarle información
            relacionada con los productos y servicios que ofrece nuestra empresa
            y que detallan en este web site. <br />– Realizar la contratación de
            nuestros servicios mediante la aceptación del correspondiente
            presupuesto / pedido y/o la firma de un contrato mercantil. <br />–
            Enviarle por correo electrónico y/o postal las noticias y novedades
            acerca de nuestra entidad, así como las actualizaciones de nuestro
            catálogo de productos y servicios. <br />
            <br /> <span> 2.1. Plazo de Conservación de sus datos </span>
            <br />
            Conservaremos sus datos personales desde que nos dé su
            consentimiento hasta que lo revoque o bien solicite la limitación
            del tratamiento. En tales casos, mantendremos sus datos de manera
            bloqueada durante los plazos legalmente exigidos. <br />
            <span>LEGITIMACIÓN Y DATOS RECABADOS</span>
            <br /> La legitimación para el tratamiento de sus datos es el
            consentimiento expreso otorgado mediante un acto positivo y
            afirmativo (rellenar el formulario correspondiente y marcar la
            casilla de aceptación de esta política) en el momento de
            facilitarnos sus datos personales.
            <br />
            <br />
            <span>3.1. Consentimiento para tratar sus datos</span> <br />
            Al rellenar los formularios, marcar la casilla “Acepto la Política
            de Privacidad” y hacer clic para enviar los datos, o al remitir
            correos electrónicos a la Empresa a través de las cuentas
            habilitadas al efecto, el Usuario manifiesta haber leído y aceptado
            expresamente la presente política de privacidad, y otorga su
            consentimiento inequívoco y expreso al tratamiento de sus datos
            personales conforme a las finalidades indicadas.
            <br />
            <br />
            <span>3.2. Categorías de datos </span>
            <br />
            Los datos que se recaban se refieren a la categoría de datos
            identificativos, como pueden ser: Nombre y Apellidos, Teléfono,
            Dirección Postal, Empresa, Correo electrónico, así como la dirección
            IP desde donde accede al formulario de recogida de datos. <br />
            <span>MEDIDAS DE SEGURIDAD </span> <br />
            Dentro de nuestro compromiso por garantizar la seguridad y
            confidencialidad de sus datos de carácter personal, le informamos
            que se han adoptado las medidas de índole técnica y organizativas
            necesarias para garantizar la seguridad de los datos de carácter
            personal y evitar su alteración, pérdida, tratamiento o acceso no
            autorizado, habida cuenta del estado de la tecnología, la naturaleza
            de los datos almacenados y los riesgos a que estén expuestos, según
            el Art. 32 del RGPD EU 679/2016.
            <br />
            <span>CESIÓN DE DATOS</span> <br />
            No se prevén cesiones de datos ni transferencias internacionales de
            sus datos, a excepción de las autorizadas por la legislación fiscal,
            mercantil y de telecomunicaciones así como en aquellos casos en los
            que una autoridad judicial nos lo requiera. <br />
            <span>DERECHOS DEL USUARIO</span> <br /> Cualquier interesado tiene
            derecho a obtener confirmación sobre si estamos tratando datos
            personales que le conciernan, o no. Las personas interesadas tienen
            derecho a acceder a sus datos personales, así como a solicitar la
            rectificación de los datos inexactos o, en su caso, solicitar su
            supresión cuando, entre otros motivos, los datos ya no séan
            necesarios para los fines que fueron recogidos. En determinadas
            circunstancias, los interesados podrán solicitar la limitación del
            tratamiento de sus datos, en cuyo caso únicamente los conservaremos
            para el ejercicio o la defensa de reclamaciones. Por motivos
            relacionados con su situación particular, los interesados podrán
            oponerse oponerse al tratamiento de sus datos. El Responsable del
            fichero dejará de tratar los datos, salvo por motivos legítimos
            imperiosos, o el ejercicio o la defensa de posibles reclamaciones.{' '}
            <br />
            De acuerdo con la legislación vigente tiene los siguientes derechos:
            derecho a solicitar el acceso a sus datos personales, derecho a
            solicitar su rectificación o supresión, derecho a solicitar la
            limitación de su tratamiento, derecho a oponerse al tratamiento,
            derecho a la portabilidad de los datos y así mismo, a revocar el
            consentimiento otorgado. <br />
            <br />
            <span>6.1. ¿Cómo ejercitar mis derechos?</span> <br />
            Para ejercer sus derechos, debe dirigirse al responsable,
            solicitando el correspondiente formulario para el ejercicio del
            derecho elegido. Opcionalmente, puede acudir a la Autoridad de
            Control competente para obtener información adicional acerca de sus
            derechos. Los datos de contacto para el ejercicio de sus derechos
            son el teléfono
            <span> 951995959</span> y el correo electrónico: info@ideacasa.es.{' '}
            <br />
            Recuerde acompañar una copia de un documento que nos permita
            identificarle.
            <span>
              {' '}
              <br />
              CONSENTIMIENTO PARA ENVÍO DE COMUNICACIONES ELECTRÓNICAS
            </span>{' '}
            <br /> Así mismo, y de acuerdo con lo establecido en la Ley 34/2002,
            de 11 de julio, de Servicios de la Sociedad de la Información y del
            Comercio Electrónico, completando el formulario de recogida de datos
            y marcando la correspondiente casilla “Acepto el envío de
            comunicaciones electrónicas”, está otorgando el consentimiento
            expreso para enviarle a su dirección de correo electrónico,
            teléfono, fax u otro medio electrónico en envío de información
            acerca de la Empresa.
          </div>
          <hr />
          <div className="d-flex justify-content-center mb-3">
            <img src="/images/logos/logo-navbar.png" alt="" className="w-50" />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
