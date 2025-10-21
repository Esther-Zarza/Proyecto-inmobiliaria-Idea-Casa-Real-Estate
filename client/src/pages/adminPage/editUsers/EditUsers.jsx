import React, { useContext, useEffect, useState } from 'react';
import { CardEditUser } from '../../../components/Card/cardEditUser/CardEditUser';
import { Container, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import { useDebounce } from '../../../assets/hooks/useDebounce';

const initualValue = {
  search: '',
  filAdmin: false,
  filCol: false,
  currentPage: 1,
  limitUser: 10,
};

export const EditUsers = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(initualValue);
  const debouncedSearch = useDebounce(filter.search);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchData('/admin/getUsers', 'POST', filter);
        setUsers(res.data.users);
        setTotalPages(res.data.pages);
        setFilter({...filter, currentPage:1})
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [debouncedSearch, filter.filAdmin, filter.filCol]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchData('/admin/getUsers', 'POST', filter);
        setUsers(res.data.users);
        setTotalPages(res.data.pages);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [filter.currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter.currentPage]);

  const handleChange = (e) => { 
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      setFilter({ ...filter, [name]: checked });
      
    }
  };

  const handleChangeText = (e) => {
    e.preventDefault();  
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    
  }

  return isMobile ? (
    <section className="bg-form">
      <div className="d-flex flex-column align-items-center text-white py-5">
        <h2>Administrar usuarios</h2>
        <div className="line-title-white"></div>
      </div>
      <Container>
        <div>
          <Form className=" text-white align-items-center mb-4" onSubmit={handleChangeText}>
            <Form.Group controlId="formSearch" className="mb-2">
              <Form.Control
                type="text"
                name="search"
                placeholder="Buscar"
                onChange={handleChangeText}
              />
            </Form.Group>
            <div className="d-flex">
              <Form.Group className="me-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Usuarios deshabilitados"
                  name="filCol"
                  checked={filter.filCol}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="me-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="
                  Administradores"
                  name="filAdmin"
                  checked={filter.filAdmin}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </Form>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-center">
          {users?.length > 0 ?
          users?.map((elem, index) => {
            return (
              <div key={index}>
                <CardEditUser
                  userData={elem}
                  token={token}
                  users={users}
                  setUsers={setUsers}
                />
              </div>
            );
          }) :
          <p className='error-filter'>No hay usuarios que coincidan con los filtros introducidos</p>
        }
        </div>
        {users?.length >= 1 && <div className='d-flex justify-content-center align-items-center mt-4'>
          {filter.currentPage !== 1 && 
          <button onClick={()=>setFilter({...filter, currentPage: filter.currentPage - 1 })} className='btn-4 me-2'><i class="bi bi-caret-left-fill"></i></button>}
          {filter.currentPage === 1 && 
          <button className='btn-4 me-2'><i class="bi bi-caret-left-fill"></i></button>}

          <span className='text-white'>
            {filter.currentPage} de {totalPages || 1}
          </span>
         
          {filter.currentPage !== totalPages && <button className='btn-4 ms-2' onClick={()=>setFilter({...filter, currentPage: filter.currentPage + 1 })}><i class="bi bi-caret-right-fill"></i></button>}
          {filter.currentPage === totalPages && <button className='btn-4 ms-2'><i class="bi bi-caret-right-fill"></i></button>}
        </div>}
      </Container>
    </section>
  ) : (
    <section className="bg-form">
      <div className="d-flex flex-column align-items-center text-white py-5">
        <h2>Administrar usuarios</h2>
        <div className="line-title-white"></div>
      </div>
      <Container>
        <div>
          <Form className="d-flex justify-content-end text-white align-items-center mb-3" onSubmit={handleChangeText}>
            <Form.Group className="me-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Usuarios deshabilitados"
                name="filCol"
                checked={filter.filCol}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="me-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Mostrar administradores"
                name="filAdmin"
                checked={filter.filAdmin}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                name="search"
                placeholder="Buscar"
               onChange={handleChangeText}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-center">
          {users?.length > 0 ?
          users?.map((elem, index) => {
            return (
              <div key={index}>
                <CardEditUser
                  userData={elem}
                  token={token}
                  users={users}
                  setUsers={setUsers}
                />
              </div>
            );
          }) 
          :
          <p className='error-filter'>No hay usuarios que coincidan con los filtros introducidos</p>
          }
        </div>
        {users?.length >= 1 && <div className='d-flex justify-content-center align-items-center mt-4'>
          {filter.currentPage !== 1 && 
          <button onClick={()=>setFilter({...filter, currentPage: filter.currentPage - 1 })} className='btn-4 me-2'><i class="bi bi-caret-left-fill"></i></button>}
          {filter.currentPage === 1 && 
          <button className='btn-4 me-2'><i class="bi bi-caret-left-fill"></i></button>}

          <span className='text-white'>
            {filter.currentPage} de {totalPages || 1}
          </span>
         
          {filter.currentPage !== totalPages && <button className='btn-4 ms-2' onClick={()=>setFilter({...filter, currentPage: filter.currentPage + 1 })}><i class="bi bi-caret-right-fill"></i></button>}
          {filter.currentPage === totalPages && <button className='btn-4 ms-2'><i class="bi bi-caret-right-fill"></i></button>}
        </div>}
      </Container>
    </section>
  );
};
