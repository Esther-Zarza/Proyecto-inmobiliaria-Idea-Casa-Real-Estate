import { useContext, useState } from 'react';
import './formBusquedaHome.css';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';


export const FormBusquedaHome = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(2);
    
  const {user} = useContext(AuthContext);
  
  const handleSearch = (e) => {    
    const {value} = e.target;
    setSearch(value);
  };

  const changeSearch = () => {  
    const trimmed = search.trim();
    if(user?.user_type === 1 || user?.user_type === 0 ){
      navigate(`/admin/inmuebles?ubicacion=${encodeURIComponent(trimmed)}&tipo=${activeFilter}`);
    }
    else if(user?.user_type === 2 ){
      navigate(`/user/inmuebles?ubicacion=${encodeURIComponent(trimmed)}&tipo=${activeFilter}`);
    }  
    else{
      navigate(`/inmuebles?ubicacion=${encodeURIComponent(trimmed)}&tipo=${activeFilter}`);
    }

  }

  return (
    <section className="section-busqueda-home d-flex flex-column">
      <Container>
        <h1 className='text-white text-center pb-2'>LA DIFERENCIA ENTRE BUSCAR Y ENCONTRAR</h1>

        <div className="div-busqueda d-flex flex-column justify-content-center align-items-center m-auto rounded-3">
          <div className="d-flex justify-content-center gap-5 mt-4 ">
            <button 
              className={`btn-van ${activeFilter === 2 ? 'active-btn-home' : ''}`} 
              onClick={()=>setActiveFilter(2)}
            >Venta</button>
            <button 
              className={`btn-van ${activeFilter === 3 ? 'active-btn-home' : ''}`}
              onClick={()=>setActiveFilter(3)}
            >Alquiler</button>
            <button 
              className={`btn-van ${activeFilter === 4 ? 'active-btn-home' : ''}`}
              onClick={()=>setActiveFilter(4)}
            >Obra Nueva</button>
          </div>



          <Form 
            className="d-flex flex-column align-items-center py-4 gap-4 w-100"
              onSubmit={(e) => {
                e.preventDefault();
                changeSearch();
              }}            
          >

            <div className="lupa d-flex align-items-center w-75">
              <i className="bi bi-search me-2"></i>              
              <input
                className="search mb-1 buscador"
                placeholder="¿Dónde quieres buscar?"
                type="search"                
                value={search}
                onChange={handleSearch}
              />
            </div>


            <button type="submit" onClick={changeSearch} className="btn-buscar">Buscar</button>

          </Form>
        </div>
      </Container>
    </section>
  );
};
