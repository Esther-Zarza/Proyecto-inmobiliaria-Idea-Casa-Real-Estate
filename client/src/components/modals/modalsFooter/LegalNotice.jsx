import './legalNotice.css';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export const LegalNotice = ({ setShowModalLegal }) => {
  return (
    <div className="modal-overlay-legal">
      <Modal.Dialog className="modal-content-legal">
        <Modal.Header
          closeButton
          onClick={() => setShowModalLegal(false)}
        ></Modal.Header>
        <Modal.Body className="modal-body-legal">
          <h2 className="text-center pb-4">Términos de uso</h2>
          <hr />
          <p>
            <span> 1. AVISO LEGAL: </span>
          </p>
          <p>
            El presente aviso e información legales (en adelante Aviso Legal)
            regula el uso del servicio del Web Site, que ideaCasa Real Estate
            pone a disposición de los usuarios de Internet.
          </p>
          <p>
            Las Condiciones de Uso y Avisos son aplicables al Sitio y no se
            aplican a contenidos de terceros, poniéndose a su disposición
            siempre que acepten íntegramente los términos, condiciones y avisos
            contenidos en el presente Aviso Legal. El uso del Web Site se
            interpretará como una aceptación de todos los referidos términos,
            condiciones y avisos
          </p>
          <p>
            La información contenida en la Web Site sobre cada uno de los
            inmuebles y promociones es la que facilitan las inmobiliarias (en
            adelante oficinas ideaCasa u oficinas franquiciadas ideaCasa) e
            incluye imágenes, planos, mapas, infografías de proyectos
            realizados, proyectos en ejecución o futuros proyectos, fotografías,
            etc. Todos los datos que el servicio proporciona, salvo errores
            tipográficos, proceden directamente de IDEACASA REAL ESTATE y/o
            oficinas ideaCasa siendo cada uno los responsables de su veracidad,
            no constituyendo esa información documento contractual alguno.
          </p>
          <p>
            Cada inmueble está directamente relacionado y vinculado con la
            oficina alfa o empresa que comercializa el inmueble. Por lo tanto,
            toda la información relativa al Real Decreto 515/1989 del 21 de
            abril (Protección de los consumidores en cuanto a la información a
            suministrar en la compraventa y arrendamiento de viviendas) se
            encuentra a disposición del público en las oficinas de las
            inmobiliarias correspondientes. Por tanto, a través de la Web Site
            usted podrá obtener: Información relacionada sobre, productos,
            servicios y precios, siendo dicha información meramente informativa,
            y no constituyendo una oferta contractual. Información actualizada,
            por lo que dicha información puede variar con frecuencia. Se
            aconseja la visión de las fichas de inmuebles antes de efectuar
            cualquier operación de compra o transmisión de la propiedad sobre un
            inmueble.
          </p>
          <p>
            IDEACASA REAL ESTATE emplea toda su diligencia en comprobar la
            veracidad de los datos que proporcionan las inmobiliarias de la red
            ideaCasa, pero no se responsabiliza de la veracidad de los mismos,
            siendo las agencias que comercialicen el inmueble o producto, de
            forma individual las únicas responsables de la misma, así como de
            los datos, planos, fotografías, imágenes y demás elementos que éstas
            empleen para la comercialización del inmueble a través de la citada
            página, siendo por tanto las únicas responsables de los daños y
            perjuicios que puedan derivarse frente a terceros.
          </p>
          <p>
            En todo caso, IDEACASA REAL ESTATE no garantiza la fiabilidad de
            tales datos, ya que los mismos pueden estar sujetos a algún tipo de
            error.
          </p>
          <p>
            IDEACASA REAL ESTATE no se responsabiliza de la existencia de
            embargos, censos y cualesquiera otras cargas a que puedan estar
            afectos los inmuebles incluidos en el sitio Web.
          </p>
          <p>
            IDEACASA REAL ESTATE no se responsabiliza de la información,
            productos, contenidos y servicios de otras webs que se puedan
            enlazar, directa o indirectamente, a través de la Web Site.
          </p>
          <p>
            IDEACASA REAL ESTATE se reserva el derecho de modificar, limitar o
            cancelar el acceso y los contenidos de su Web cuando lo estime
            oportuno, no responsabilizándose de las posibles discrepancias que
          </p>
          <p>
            pudieran surgir entre la versión de sus documentos impresos, y la
            versión electrónica de los mismos.
          </p>
          <p>
            IDEACASA REAL ESTATE, salvo previa autorización, prohíbe la
            reproducción, copia, uso, distribución, comercialización o cualquier
            actividad que se pueda realizar con los contenidos de su página Web.
          </p>
          <p>
            <span> 2. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS: </span>
          </p>
          <p>
            IDEACASA REAL ESTATE conforme al Reglamento (UE) 2016/679 del
            Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a
            la protección de las personas físicas en lo que respecta al
            tratamiento de datos personales y a la libre circulación de estos
            datos (en adelante “RGPD”), ha adoptado las medidas y niveles de
            seguridad de protección de datos exigidos.
          </p>
          <p>
            La visita a esta Web Site no supone que el usuario esté obligado a
            facilitar ninguna información sobre sí mismo. En el caso de que
            proporcione el usuario alguna información de carácter personal, los
            datos recogidos en este Web Site serán utilizados y a la libre
            circulación de estos datos (en adelante, “RGPD”), serán tratados con
            la finalidad de (i) realizar una correcta gestión de la relación,
            así como la gestión administrativa, económica y comercial, (ii)
            atender sus consultas y solicitudes, (iii) realizar un control de
            calidad sobre nuestros productos y servicios, (iv) remitirle
            comunicaciones personales y obsequios dirigidos a nuestros clientes,
            (v) realización de encuestas de opinión y fines estadísticos, ya
            para informarle periódicamente de novedades, productos y servicios
            tanto por medios escritos como electrónicos, (vi) cumplimiento de
            normativas en materia de prevención de blanqueo de capitales y
            financiación del terrorismo.
          </p>
          <p>
            La cumplimentación del formulario en la oficina o a través de la Web
            Site y el envío de correos y correos electrónicos u otras
            comunicaciones a IDEACASA REAL ESTATE implica el consentimiento
            expreso del usuario a la inclusión de sus datos de carácter personal
            en el referido fichero automatizado de IDEACASA REAL ESTATE, con una
            finalidad comercial, financiera, de personalización, operativa y
            estadística y actividades propias de su objeto social, autorizando
            expresamente a IDEACASA REAL ESTATE para la extracción,
            almacenamiento de datos y estudios de marketing al objeto de adecuar
            sus ofertas al perfil particular acorde a nuestra Política de
            Privacidad en la web.
          </p>
          <p>
            IDEACASA REAL ESTATE podrá conservar sus datos una vez finalizada
            toda la relación con el usuario para cumplir obligaciones legales,
            procediendo a la cancelación de los datos recogidos cuando dejen de
            ser necesarios o pertinentes para la finalidad para la que hubiesen
            sido recabados o registrados. En el caso de que los datos recogidos
            se utilizasen para una finalidad distinta para la cual hubiesen sido
            recabados o recogidos se requerirá el consentimiento previo de los
            interesados.
          </p>
          <p>
            IDEACASA REAL ESTATE ha adoptado las medidas técnicas y
            organizativas necesarias para garantizar la seguridad e integridad
            de los datos, así como para evitar su alteración, perdida,
            tratamiento o acceso no autorizado.
          </p>
          <p>
            Los usuarios cuyos datos sean objeto de tratamiento podrán ejercitar
            gratuitamente los derechos de oposición, acceso e información,
            rectificación, cancelación de sus datos y revocación de su
            autorización sin efectos retroactivos en los términos especificados
            en la Política de Privacidad.
          </p>
          <p>
            El acceso a este Web Site puede implicar la utilización de cookies.
            Las cookies son pequeñas cantidades de información que se almacenan
            en el navegador utilizado por cada usuario para que el servidor
            recuerde cierta información que posteriormente únicamente el
            servidor que la implementó leerá. Las cookies tienen, generalmente,
            una duración limitada en el tiempo. Ninguna cookie permite que pueda
            contactarse con el número de teléfono del usuario, su dirección de
            correo electrónico o con cualquier otro medio de contacto.
          </p>
          <p>
            Ninguna cookie puede extraer información del disco duro del usuario
            o robar información personal. La única manera de que la información
            privada de un usuario forme parte del archivo cookie es que el
            usuario dé personalmente esa información al servidor. Aquellos
            usuarios que no deseen recibir cookies o quieran ser informados de
            su fijación pueden configurar su navegador a tal efecto.
          </p>
          <p>
            ALFA INMOBILIARIA se reserva el derecho de modificar en cualquier
            momento la presente política de privacidad sin necesidad de aviso
            previo de conformidad con la normativa vigente.
          </p>
          <p>
            <span>3. DERECHOS DE AUTOR:</span>
          </p>
          <p>
            Esta Web Site, incluyendo sin carácter exclusivo el texto, software,
            contenido, fotografías, iconos, iconos de botones, archivos de audio
            en cualquiera de sus formatos, archivos de video en cualquiera de
            sus formatos, material audiovisual y gráficos, está protegida por
            marcas, derechos de autor y otros derechos legítimos registrados, de
            acuerdo con los tratados internacionales en los que España es parte
            y otros derechos de propiedad y leyes del reino de España.
          </p>
          <p>
            Una parte de las imágenes utilizadas en este sitio Web no son
            propiedad IDEACASA REAL ESTATE, sino que son enviadas directamente
            por los usuarios o inmobiliarias. Si alguna de estas imágenes
            estuviera sujeta a derechos de autor, o a algún otro tipo de derecho
            que impida su publicación en esta Web, una vez que IDEACASA REAL
            ESTATE tenga conocimiento del hecho, procederá a la retirada
            inmediata de la imagen protegida por los derechos pertinentes.
          </p>
          <p>
            <span>4. USO DEL SITIO WEB:</span>
          </p>
          <p>
            Esta Web Site es única y exclusivamente para uso personal de los
            usuarios. Se prohíbe su modificación, reproducción, duplicación,
            copia, distribución, venta, reventa y demás formas de explotación
            con fines comerciales o no. Usted se compromete a no utilizar este
            sitio Web para fines ilegales o prohibidos.
          </p>
          <p>
            <span>5. RESTRICCIONES DE USO:</span>
          </p>
          <p>
            Usted no puede utilizar el servicio para fines ilícitos. Acepta usar
            el servicio sólo para su uso personal no lucrativo. Asimismo, acepta
            no usar, transferir, distribuir o disponer de la información
            incluida en el servicio de forma que compita de manera desleal con
            IDEACASA REAL ESTATE y las inmobiliarias pertenecientes a su red.
            Igualmente Reconoce que el servicio ha sido desarrollado, compilado,
            preparado, revisado, seleccionado y conformado por IDEACASA REAL
            ESTATE. Acepta proteger los derechos de autor de IDEACASA REAL
            ESTATE, así como informar a ésta por escrito y de manera oportuna,
            si observa un uso no autorizado o adecuado del servicio por terceros
            o violaciones de derechos de autor, marcas registradas y otros
            derechos que el servicio pudiera estar infringiendo o viceversa.
          </p>
          <p>
            <span>6. LIMITACIÓN DE RESPONSABILIDAD:</span>
          </p>
          <p>
            IDEACASA REAL ESTATE ofrece esta Web Site “tal y como está”, es
            decir, no garantiza expresa o implícitamente los elementos. En
            cuanto al funcionamiento del sitio Web, o la información, contenido,
            software, diseños, archivos, o productos incluidos en el mismo,
            IDEACASA REAL ESTATE queda exonerada de cualesquiera garantías,
            incluidas, entre otras, la garantía de idoneidad para un fin
            determinado. IDEACASA REAL ESTATE NO SERÁ RESPONSABLE DE LOS DAÑOS O
            PERJUICIOS DE CUALQUIER ÍNDOLE QUE PUEDAN DERIVARSE DEL USO DE ESTE
            SITIO WEB, INCLUIDOS, ENTRE OTROS, LOS DAÑOS DIRECTOS E INDIRECTOS.
          </p>
          <p>
            Sin perjuicio de lo dispuesto en el párrafo anterior, IDEACASA REAL
            ESTATE no asume responsabilidad alguna que pudiere derivarse de la
            falta de veracidad, completud, actualización y precisión de los
            datos o informaciones sobre ofertas, productos o servicios, precios,
            rutas, distancias, características y cualesquiera otros datos e
            informaciones relevantes acerca de los productos y servicios
            ofrecidos a través del Web Site por los proveedores de productos o
            servicios.
          </p>
          <p>
            IDEACASA REAL ESTATE no garantiza que el servicio sea compatible con
            su equipo físico o lógico, ni tampoco que el servicio no tenga
            errores, virus, gusanos o “caballos de troya” y no se hace
            responsable de daños causados por estos elementos destructivos.
            Usted reconoce que IDEACASA REAL ESTATE, sus proveedores y agentes
            no son responsables de (1) daños, ya sean éstos causados por la
            negligencia de IDEACASA REAL ESTATE, sus empleados, contratistas,
            agentes, proveedores o ya surjan en conexión con el servicio, no
            siendo IDEACASA REAL ESTATE responsable de ninguna pérdida de
            ganancias, pérdida en general, daños indirectos o colaterales, ni a
            consecuencia de la interposición de demandas en contra de DEACASA
            REAL ESTATE por terceros; ni de (2) fallos, discrepancias,
            omisiones, tardanzas u otros errores en el servicio causados por su
            ordenador o por el uso del servicio en tal equipo.
          </p>
          <p>
            El contenido de otros sitios Web, bienes o anuncios publicitarios
            que puedan estar vinculados al servicio no se administra o controla
            por IDEACASA REAL ESTATE. Asimismo, IDEACASA REAL ESTATE se exonera
            de cualquier responsabilidad derivada del incumplimiento o
            cumplimiento defectuoso por los proveedores de productos o
            servicios, de las obligaciones derivadas de la normativa en vigor y
            de los términos y condiciones de venta de cada uno de los productos
            y que se contraten a través del Web Site (a) no garantiza, en forma
            explícita o implícita, el uso de los enlaces proporcionados en o
            hacia el servicio, (b) no garantiza la exactitud, la totalidad, la
            utilidad o la adecuación de cualquier otros sitios Web, servicios,
            bienes o anuncios publicitarios que puedan estar vinculados al
            servicio, (c) ni promueve en forma implícita o explícita otros
            sitios Web, servicios, bienes o anuncios publicitarios que puedan
            estar vinculados al servicio.
          </p>
          <p>
            Obligaciones de las oficinas ideaCasa que anuncian los inmuebles:
          </p>
          <p>
            Responder frente a los consumidores y en general cualquier tercero
            interesado en sus anuncios de la veracidad y exactitud del inmueble
            ofertado, así como de todas sus condiciones y requisitos legales con
            arreglo a la normativa vigentes y en especial, a la normativa de
            consumo y la relativa a la Certificación energética.
          </p>
          <p>
            Todos los anuncios de inmuebles deberán ofrecer una información
            clara de las condiciones del inmueble sin que la información induzca
            o pueda inducir a confusión, error u engaño.
          </p>
          <p>
            No publicar anuncios inmorales, ilícitos o que propongan situaciones
            de ilegalidad o atenten contra la dignidad de las personas.
          </p>
          <p>
            No publicar anuncios de inmuebles sobre los que no tenga derechos de
            explotación legalmente demostrables.
          </p>
          <p>
            Las oficinas franquiciadas de ideaCasa como empresas con
            personalidad jurídica independiente asumen directa y personalmente
            la responsabilidad de publicar inmuebles que no dispongan del
            correspondiente certificado de eficiencia energética.
          </p>
          <p>
            <span>7. RESPONSABILIDAD CIVIL:</span>
          </p>
          <p>
            DEACASA REAL ESTATE, sus directivos y empleados, socios colectivos,
            filiales, subsidiarias, sucesores y cesionarios, así como sus
            agentes no serán responsables, directa o indirectamente, en manera
            alguna, frente a usted o cualquier otra persona por: (1) errores y
            omisiones del servicio; (2) retrasos, errores o interrupciones en la
            transmisión o entrega del servicio o (3) pérdidas o daños
            ocasionados o por cualquier otra razón de incumplimiento.
          </p>
          <p>
            <span>8. INFORMACIÓN GENERAL:</span>
          </p>
          <p>
            El presente Aviso Legal, así como cualquier relación entre usted
            como usuario y IDEACASA REAL ESTATE se regirán por la legislación
            del reino de España. Para cualquier cuestión litigiosa derivada de
            la existencia o contenido de este Aviso Legal o de las relaciones
            entre el usuario y IDEACASA REAL ESTATE, ambas partes, con renuncia
            expresa a cualquier otro fuero que pudiera corresponderles, se
            someten a la jurisdicción y competencia exclusiva de los Juzgados y
            Tribunales de Málaga (España). Nos reservamos el derecho a realizar
            cambios en cualquier momento en nuestro sitio web, así como en este
            Aviso Legal.
          </p>
          <p>
            <span>9. TRANSFERENCIAS INTERNACIONALES:</span>
          </p>
          <p>
            Le informamos que sus datos no se comunicarán a entidades fuera del
            Espacio Económico Europeo sin su consentimiento expreso, salvo en
            los casos en que una norma imperativa permita dicha comunicación, en
            tales casos le informaremos siempre que sea posible de las
            finalidades de dicha comunicación.
          </p>
          <p>
            <span>
              IDEACASA REAL ESTATE SL (en adelante ideaCasa Real Estate)
            </span>
          </p>
          <p>
            <span>CIF:</span> B-93637080
          </p>
          <p>
            <span>Domicilio social:</span> Ctra Coín, nº 74 - 29140 - Churriana
            - Málaga
          </p>
          <p>
            <span>Email:</span> oficina@ideacasa.es
          </p>
          <p>
            <span>Teléfono:</span> 951995959
          </p>
          <p>
            <span>Web:</span> www.ideacasa.es (en adelante Web Site)
          </p>
          <hr />
          <div className="d-flex justify-content-center mb-3">
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa"
              className="w-50"
            />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
