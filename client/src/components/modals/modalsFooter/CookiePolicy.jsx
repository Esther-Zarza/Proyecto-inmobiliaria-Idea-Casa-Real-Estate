import './cookiePolicy.css';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


export const CookiePolicy = ({setShowModalCookie}) => {
   

  return (
    <div className="modal-overlay-cookie">
      <Modal.Dialog className="modal-content-cookie-policy">
        <Modal.Header
          closeButton
          onClick={() => setShowModalCookie(false)}
        ></Modal.Header>
        <Modal.Body className="modal-body-cookie">
          <h2 className="text-center pb-4">Política de Cookies</h2>
          <div>
            <hr />
            <span>
              Qué son las cookies y por qué las utilizamos en ideaCasa Real
              Estate
            </span>
          </div>
          <p>
            Una cookie es un fichero que se descarga en el dispositivo del
            usuario al acceder a determinadas páginas web para almacenar y
            recuperar información sobre la navegación que se efectúa desde dicho
            equipo.
          </p>
          <p>
            Las cookies permiten a dicha web, entre otras cosas, almacenar y
            recuperar información sobre las decisiones y hábitos del usuario. En
            ideaCasa Real Estate las utilizamos para personalizar la experiencia
            dentro de nuestra web y facilitar la navegación.
          </p>
          <p>
            Es importante destacar que el uso de cookies no proporciona datos
            personales del usuario, que de cara a ideaCasa Real Estate,
            permanece anónimo.
          </p>
          <p>
            El usuario puede configurar su navegador para no aceptar el uso de
            cookies, en cuyo caso la personalización de la experiencia no se
            aplicaría aunque sí podrá seguir accediendo a los contenidos de
            nuestras webs con normalidad.
          </p>
          <br />
          <p>
            <span>Tipología, finalidad y funcionamiento de las Cookies</span>
          </p>
          <p>
            Las Cookies, en función de su permanencia, pueden dividirse en Cookies de sesión o permanentes. Las primeras expiran cuando el Usuario cierra el navegador. Las segundas expiran en función de cuándo se cumpla el objetivo para el que sirven o bien cuando se borran manualmente.
          </p>
          <p>
            Adicionalmente, en función de su objetivo, las Cookies puedes clasificarse de la siguiente forma:
          </p>
          <p>
            COOKIES DE RENDIMIENTO: Este tipo de Cookie recuerda sus preferencias para las herramientas que se encuentran en los Servicios, por lo que no tiene que volver a configurar el servicio cada vez que usted visita. A modo de ejemplo, en esta tipología se incluyen:
          </p>
          <p>
            COOKIES DE GEO-LOCALIZACIÓN: Estas Cookies son utilizadas para averiguar en qué país se encuentra cuando se solicita un Servicio. Esta Cookie es totalmente anónima, y sólo se utiliza para ayudar a orientar el contenido a su ubicación.
          </p>
          <p>
            COOKIES DE REGISTRO: Las Cookies de registro se generan una vez que el Usuario se ha registrado o posteriormente ha abierto su sesión, y se utilizan para identificarle en los Servicios con los siguientes objetivos:
          </p>
          <p>
            Mantener al Usuario identificado de forma que, si cierra un Servicio, el navegador o el ordenador y en otro momento u otro día vuelve a entrar en dicho Servicio, seguirá identificado, facilitando así su navegación sin tener que volver a identificarse. Esta funcionalidad se puede suprimir si el Usuario pulsa la funcionalidad “cerrar sesión”, de forma que esta Cookie se elimina y la próxima vez que entre en el Servicio el Usuario tendrá que iniciar sesión para estar identificado.
          </p>
          <p>
            Comprobar si el Usuario está autorizado para acceder a ciertos Servicios, por ejemplo, para participar en un concurso.
          </p>
          <p>
            Adicionalmente, algunos Servicios pueden utilizar conectores con redes sociales tales como Facebook o Twitter. Cuando el Usuario se registra en un Servicio con credenciales de una red social, autoriza a la red social a guardar una Cookie persistente que recuerda su identidad y le garantiza acceso a los Servicios hasta que expira. El Usuario puede borrar esta Cookie y revocar el acceso a los Servicios mediante redes sociales actualizando sus preferencias en la red social que específica.
          </p>
          <p>
            COOKIES DE ANALÍTICAS: Cada vez que un Usuario visita un Servicio, una herramienta de un proveedor externo (Google Analytics, Omniture, Netscope y similares que podrán añadirse a este listado en caso de que varíen en relación con los actuales) genera una Cookie analítica en el ordenador del Usuario. Esta Cookie que sólo se genera en la visita, servirá en próximas visitas a los Servicios de Isla Canela para identificar de forma anónima al visitante. Los objetivos principales que se persiguen son:
          </p>
          <p>
            Permitir la identificación anónima de los Usuarios navegantes a través de la “Cookie” (identifica navegadores y dispositivos, no personas) y por lo tanto la contabilización aproximada del número de visitantes y su tendencia en el tiempo.
          </p>
          <p>
            Identificar de forma anónima los contenidos más visitados y por lo tanto más atractivos para los Usuarios
          </p>
          <p>
            Saber si el Usuario que está accediendo es nuevo o repite visita.
          </p>
          <p>
            COOKIES DE PUBLICIDAD: Este tipo de “Cookies” permiten ampliar la información de los anuncios mostrados a cada Usuario anónimo. Entre otros, se almacena la duración o frecuencia de visualización de posiciones publicitarias, la interacción con las mismas, o los patrones de navegación y/o comportamientos del Usuario ya que ayudan a conformar un perfil de interés publicitario. De este modo, permiten ofrecer publicidad afín a los intereses del Usuario.
          </p>
          <p>
            <span> Cómo deshabilitar las cookies en el navegador </span>
          </p>
          <p>
            La mayoría de navegadores actualmente permiten al usuario configurar si desean aceptar cookies y cuáles de ellas. Estos ajustes normalmente se encuentran en las “opciones” o “Preferencias” del menú de su navegador.
          </p>
          <p>
            Estas son las instrucciones para configurar las cookies en los principales navegadores:
          </p>
           <p>
            <span> Internet Explorer </span>
          </p>
          <p>
            Herramientas {">"} Opciones de Internet {">"} Privacidad {">"} Configuración
          </p>
          <p>
            Para más información, puede consultar el soporte de Microsoft o la Ayuda del navegador
          </p>
           <p>
            <span> Chrome </span>
          </p>
          <p>
            Herramientas {">"} Opciones {">"} Privacidad {">"} Configuración Personalizada {">"}
          </p>
          <p>
            Para más información, puede consultar el soporte de Google o la Ayuda del navegador.
          </p>
           <p>
            <span> Firefox </span>
          </p>
          <p>
            Configuración {">"} Mostrar opciones avanzadas {">"} Privacidad {">"} Configuración de contenido {">"}
          </p>
          <p>
            Para más información, puede consultar el soporte de Mozilla o la Ayuda del navegador.
          </p>
          <p>
            <span> Safari </span>
          </p>
          <p>
            Preferencias {">"} Seguridad
          </p>
          <p>
            Para más información, puede consultar el soporte de Apple o la Ayuda del navegador.
          </p> 
          <hr />        
           <div className='d-flex justify-content-center mb-3'><img src="/images/logos/logo-navbar.png" alt="Logo de IdeaCasa" className='w-50'/></div> 

        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
