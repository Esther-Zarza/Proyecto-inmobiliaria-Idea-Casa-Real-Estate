import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContextProvider';
import { useDebounce } from '../../../assets/hooks/useDebounce';
import { fetchData } from '../../../helpers/axiosHelper';
import { Container, Form } from 'react-bootstrap';
import { CardEditAppraisalPhone } from '../../Card/cardEditAppraisal/CardEditAppraisalPhone';
import './formEditAppraisalsPhone.css'

export const FormEditAppraisalsPhone = () => {
  const {token} = useContext(AuthContext);
  const [appraisals, setAppraisals] = useState([]);
  const [filtros, setFiltros] = useState({
    eliminadas: false,
    search: ""
  });

  const debouncedSearch = useDebounce(filtros.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const buildQuery = () => {
    const params = new URLSearchParams();

    params.append('page', currentPage);
    params.append('limit', 10);

    Object.entries(filtros).forEach(([key, value]) => {
      if(typeof value === 'boolean' && value){
        params.append(key, 'true');
      }
      if(typeof value === 'string' && value.trim() !== ''){
        params.append(key, value.trim());
      }
    });

    return params.toString();
  }

  const fetchProperties = async() => {
    try {
      const query = buildQuery();
      const res = await fetchData(`/admin/allAppraisals?${query}`, 'GET', null, token);

      if(res.data.appraisals) {
        setAppraisals(res.data.appraisals);
        setTotalPages(res.data.pagination.totalPages || 1);
      }else{
        setAppraisals([]);
        setTotalPages(1);
      }
      
    } catch (error) {
      console.log("Error trayendo valoraciones", error);
    }
  }

  useEffect(() => {
    
    fetchProperties();

  }, [token, currentPage, debouncedSearch, filtros.venta, filtros.alquiler, filtros.obraNueva, filtros.eliminadas, filtros.ocultas, filtros.reservados]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);


  const handleFilter = (e) => {
    const {name, value, checked, type} = e.target;
    setFiltros({...filtros, [name]: type === 'checkbox' ? checked : value});
  }

  // para actualizar en el momento las propiedades mostradas según los filtros marcados
  const handleUpdateAppraisal = (updatedAppraisal) => {
    setAppraisals((prev) => prev.map((elem) => elem.property_id === updatedAppraisal.property_id ? updatedAppraisal : elem));
  }


  return (
    <div className="mobile-view-edit-appraisals">
      <section className='section-editAppraisal'>
          <div className='filtros-admin'>
            <Form className='d-flex gap-3 align-items-center justify-content-end text-white'>
              <Form.Group controlId='formSearch'>
                <Form.Control
                  type='text'
                  name='search'
                  placeholder='Buscar...'
                  value={filtros.search}
                  onChange={handleFilter}
                />
              </Form.Group>
              <Form.Check
                name="eliminadas"
                type="checkbox"
                label="Valoraciones eliminadas"
                checked={filtros.eliminadas}
                onChange={handleFilter}
              />
            </Form>
          </div>
          <div className='d-flex flex-column gap-3 justify-content-center'>
            {appraisals.length > 0 ?
              appraisals?.map((elem) => {
                return(
                  <CardEditAppraisalPhone
                    key={elem.property_id}
                    appraisal={elem}
                    onUpdate={handleUpdateAppraisal}
                  />
                )
              })
              :
              <p className='error-filter'>No hay valoraciones que coincidan con los filtros introducidos</p>
            }
          </div>
      
          {appraisals.length > 0 &&
            <div className='d-flex justify-content-center align-items-center mt-4'>
              <button
                className='btn-4 me-2'
                disabled={currentPage === 1}
                onClick={()=>setCurrentPage(currentPage - 1)}
              >
                <i className="bi bi-caret-left-fill"></i>
              </button>
              <span className='text-white'>
                {currentPage} de {totalPages || 1}
              </span>
              <button
                className='btn-4 ms-2'
                disabled={currentPage === totalPages}
                onClick={()=>setCurrentPage(currentPage + 1)}
              >
                <i className="bi bi-caret-right-fill"></i>
              </button>
            </div>
          }
      </section>
    </div>
  )
}
