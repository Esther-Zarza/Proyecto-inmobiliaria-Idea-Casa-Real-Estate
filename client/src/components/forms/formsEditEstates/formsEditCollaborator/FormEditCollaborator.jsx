import React, { useContext, useEffect, useState } from 'react';
import { Col, Collapse, Form, Row } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useParams } from 'react-router-dom';
import { useDebounce } from '../../../../assets/hooks/useDebounce';
import './FormEditCollaborator.css';

export const FormEditCollaborator = () => {
  const { token } = useContext(AuthContext);
  const { property_id } = useParams();
  const [collaborators, setCollaborators] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [filterCollaborator, setFilterCollaborator] = useState({
    search: '',
  });
  const debouncedSearch = useDebounce(filterCollaborator.search);

  const handleCheck = async (user) => {
    if (collaboratorIsSelected(user.user_id)) {
      try {
        const result = await fetchData(
          `/admin/deleteCollaborators/${property_id}/${user.user_id}`,
          'DELETE',
          property_id,
          token
        );

        setSelectedCollaborators(
          selectedCollaborators.filter((elem) => elem.user_id !== user.user_id)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await fetchData(
          `/admin/selectedCollaborator/${property_id}/${user.user_id}`,
          'POST',
          property_id,
          token
        );

        setSelectedCollaborators([...selectedCollaborators, user]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const collaboratorIsSelected = (user_id) => {
    let result = false;
    selectedCollaborators.forEach((elem) => {
      if (elem.user_id === user_id) {
        result = true;
      }
    });
    return result;
  };

  useEffect(() => {
    const getCollaborators = async () => {
      try {
        const res = await fetchData(
          `/admin/getCollaborators/${property_id}`,
          'GET',
          null,
          token
        );

        setCollaborators(res.data.collaborators.allCollaborators);
        setSelectedCollaborators(res.data.collaborators.selectedCollaborators);
      } catch (error) {
        console.log(error);
      }
    };

    getCollaborators();
  }, [property_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterCollaborator({ ...filterCollaborator, [name]: value });
  };

  const filteredCollaborator = collaborators.filter((elem) => {
    let include = true;
    if (debouncedSearch.trim() !== '') {
      const normalize = (str) =>
        str
          .normalize('NFD') // separa letras y acentos
          .replace(/[\u0300-\u036f]/g, '') // elimina los acentos
          .toLowerCase();
      const searchLower = normalize(debouncedSearch);
      const values = Object.values(elem).map((v) => normalize(String(v)));
      const matchesSearch = values.some((v) => v.includes(searchLower));
      include = include && matchesSearch;
    }
   

    return include;
  });

  return (
    <section className="form-container colab">
      <Form>
        <Form.Group className="mb-4">
          <div className="d-flex ">
            <Form.Label htmlFor="filterInput" className="fw-bold me-3">
              Buscar colaboradores
            </Form.Label>
          </div>

          <div className="d-flex">
            <Form.Control
              className="search-input"
              type="search"
              placeholder="Filtrar por nombre y apellidos"
              id="filterInput"
              value={filterCollaborator.search}
              onChange={handleChange}
              name="search"
            ></Form.Control>
          </div>
        </Form.Group>
      </Form>

      <Row>
        <Col className="d-flex flex-column align-items-center">
          <p className='fw-bold'>Seleccionar colaboradores</p>
          <table className="tabla">
            <thead>
              <tr>
                <th className="px-3 py-2">Nombre</th>
                <th>Apellidos</th>
                <th className="px-3 py-2">Asignar</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollaborator.length > 0 ? (
                filteredCollaborator?.map((elem) => {
                  return (
                    <tr key={elem.user_id}>
                      <td className='px-4'>{elem.user_name}</td>
                      <td className='px-4'>{elem.user_last_name}</td>
                      <td>
                        <Form>
                          <Form.Group className="ps-4">
                            <Form.Check
                              type="checkbox"
                              checked={collaboratorIsSelected(elem.user_id)}
                              name="checkCollaborators"
                              onChange={() => handleCheck(elem)}
                            />
                          </Form.Group>
                        </Form>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="error-filter-collab">
                    No hay colaboradores que coincidan con los filtros
                    introducidos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
        <Col className="assigned d-flex flex-column align-items-center">
          <p className='fw-bold'>Colaboradores asignados</p>
          <table className="tabla">
            <thead>
              <tr className="text-start">
                <th className="px-3 p-2">Nombre</th>
                <th className="px-3 p-2">Apellidos</th>
              </tr>
            </thead>
            <tbody>
              {selectedCollaborators.map((elem, i) => {
                return (
                  <tr key={i}>
                    <td className="text-start">{elem.user_name}</td>
                    <td className="text-start">{elem.user_last_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </section>
  );
};
