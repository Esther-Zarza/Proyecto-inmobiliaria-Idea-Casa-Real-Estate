import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContextProvider'
import { CardEditProperty } from '../../Card/cardEditProperty/CardEditProperty';
import { Container, Form } from 'react-bootstrap';
import './formEditProperties.css' 
import { fetchData } from '../../../helpers/axiosHelper';
import { useState } from 'react';
import { useDebounce } from '../../../assets/hooks/useDebounce';


const FormEditProperties = () => {
  const {token} = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [filtros, setFiltros] = useState({
    eliminadas: false,
    ocultas: false,
    reservados: false,
    venta: false,
    alquiler: false,
    obraNueva: false,
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
      const res = await fetchData(`/admin/allProperties?${query}`, 'GET', null, token);

      if(res.data.properties) {
        setProperties(res.data.properties);
        setTotalPages(res.data.pagination.totalPages || 1);
      }else{
        setProperties([]);
        setTotalPages(1);
      }
      
    } catch (error) {
      console.log("Error trayendo propiedades", error);
    }
  }

  useEffect(() => {
    
    fetchProperties();

  }, [token, currentPage, debouncedSearch, filtros.venta, filtros.alquiler, filtros.obraNueva, filtros.eliminadas, filtros.ocultas, filtros.reservados]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleFilter = (e) => {
    e.preventDefault();
    const {name, value, checked, type} = e.target;
    setFiltros({...filtros, [name]: type === 'checkbox' ? checked: value});
  }

  // para actualizar en el momento las propiedades mostradas según los filtros marcados de las cards (visible/eliminada/rerservado)
  const handleUpdateProperty = (updatedProperty) => {
    setProperties((prev) => prev.map((elem) => elem.property_id === updatedProperty.property_id ? updatedProperty : elem));
  };
  

  return (
    <div className='computer-view'>
      <section className='section-EditProperties'>
          <div className='filtros-admin'>
            <Form className='d-flex gap-3 align-items-center justify-content-end text-white' onSubmit={handleFilter}>
              <Form.Check
                name="venta"
                type="checkbox"
                label="Venta"
                checked={filtros.venta}
                onChange={handleFilter}
              />
              <Form.Check
                name="alquiler"
                type="checkbox"
                label="Alquiler"
                checked={filtros.alquiler}
                onChange={handleFilter}
              />
              <Form.Check
                name="obraNueva"
                type="checkbox"
                label="Obra nueva"
                checked={filtros.obraNueva}
                onChange={handleFilter}
              />
              <Form.Check
                name="ocultas"
                type="checkbox"
                label="Propiedades ocultas"
                checked={filtros.ocultas}
                onChange={handleFilter}
              />
              <Form.Check
                name="eliminadas"
                type="checkbox"
                label="Propiedades eliminadas"
                checked={filtros.eliminadas}
                onChange={handleFilter}
              />
              <Form.Check
                name="reservados"
                type="checkbox"
                label="Propiedades reservadas"
                checked={filtros.reservados}
                onChange={handleFilter}
              />
              <Form.Group controlId='formSearch'>
                <Form.Control
                  type='text'
                  name='search'
                  placeholder='Buscar...'
                  value={filtros.search}
                  onChange={handleFilter}
                />
              </Form.Group>
            </Form>
          </div>
          <div className='d-flex flex-column gap-3 justify-content-center'>
            {properties.length > 0 ?
              properties?.map((elem) => {
                return(
                  <CardEditProperty
                    key={elem.property_id}
                    property={elem}
                    onUpdate={handleUpdateProperty}
                  />
                )
              })
              :
              <p className='error-filter'>No hay propiedades que coincidan con los filtros introducidos</p>
            }
          </div>

          {properties.length > 0 &&
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

export default FormEditProperties;
