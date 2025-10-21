import React from "react";
import { Container } from "react-bootstrap";
import { CardBusqueda } from "../../../../components/Card/cardBusqueda/CardBusqueda";
import { CardVivienda } from "../../../../components/Card/CardVivienda/CardVivienda";
import { CardViviendaPhone } from "../../../../components/Card/CardVivienda/cardViviendaPhone";
import { CardDestacadaPhone } from "../../../../components/Card/CardDestacada/CardDestacadaPhone";
import { scrollToTopWithOffset } from "../../../../helpers/filterHelper";

export const PageItems = ({propsList, sizeWindows, page, setPage}) => {
  
       
    const paginar = (arr, pageNum, size) => {
        const start = (pageNum - 1) * size;
        return arr.slice(start, start + size);
    };
    //numeracion pagina
const PAGE_SIZE = sizeWindows > 768 && sizeWindows < 1200
      ? 3 // entre 768px y 1200px → 3 elementos por página
      : 5;

    const totalPages = Math.max(1, Math.ceil(propsList.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pageItems = paginar(propsList, currentPage, PAGE_SIZE);
    

const goTop = () => {
 
    scrollToTopWithOffset(-1000);
  };

  return (
    <>
        {pageItems.length === 0 ? (
                    <div className='p-4 text-center text-muted'>
                      <p className="fs-5 fw-semibold mt-4">
      🏡 No hay inmuebles disponibles con los filtros seleccionados.
    </p>
                    </div>
                  ) : (
                  pageItems.map((v) =>
                    sizeWindows < 1000 ? (
                      <section className="new-estates-phone py-4">
                        <Container>
                          <div className="d-flex justify-content-center">
                            <CardDestacadaPhone key={v.property_id} property={v} />
                          </div>
                        </Container>
                      </section>
                ) : (
                      <section className="new-estates mb-5" >
                        <Container>
                            <CardBusqueda key={v.property_id} property={v} />
                        </Container>
                      </section>
                       )
                      )
                  )}

         {propsList.length > 0 && (
  <div className="d-flex justify-content-center align-items-center gap-3 my-3">
    {/* Botón anterior */}
    <button
      className="btn-4"
      disabled={currentPage === 1}
      onClick={() => {
              setPage((p) => Math.max(1, (p || 1) - 1));
              goTop();
            }}
    >
      <i className="bi bi-caret-left-fill"></i>
    </button>

    {/* Indicador central */}
    <span className="fw-bold" style={{ color: "#120690" }}>
      {currentPage} de {totalPages}
    </span>

    {/* Botón siguiente */}
    <button
      className="btn-4"
      disabled={currentPage === totalPages}
     onClick={() => {
              setPage((p) => Math.min(totalPages, (p || 1) + 1));
              goTop();
            }}
    >
      <i className="bi bi-caret-right-fill"></i>
    </button>
  </div>
)}

    
    </>
)
};


