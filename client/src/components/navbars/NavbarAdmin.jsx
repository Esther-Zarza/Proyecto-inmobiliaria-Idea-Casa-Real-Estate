import { useContext, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { FaUser, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './navbars.css';
import { AuthContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

export const NavbarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { logOut, user } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    //recortar espacios búsqueda en ambos lados. trimmed = recorte
    const trimmed = search.trim();
    if (!trimmed) return;
    navigate(`admin/inmuebles?ubicacion=${encodeURIComponent(trimmed)}`); //codifica el texto para que sea seguro -> espacios, acéntos...
    setSearch('');
    setSidebarOpen(false); 

  };

  return (
    <>
      <Navbar expand="xxl" fixed="top" className="navBg py-3 px-xxl-5">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          {/* hamburguesa*/}
          <div className="d-xxl-none">
            <Navbar.Toggle
              aria-controls="navbarScroll"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>

          {/* Logo móvil */}
          <Navbar.Brand as={Link} to="/admin">
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa Real Estate si clickeas te lleva al navbar"
              width="180px"              
              
            />
          </Navbar.Brand>

          {/* Bandera */}
          <div className="d-xxl-none">
            <img className="icons" src="/icons/banderas/españa.svg" alt="" />
          </div>

          {/* Collapse */}
          <Navbar.Collapse id="navbarScroll" className="d-none d-xxl-flex">
            <div className="d-flex flex-column flex-xxl-row w-100 align-items-start align-items-text-xxl-end">
              {/* Buscador */}
              <Form className="mb-3 mb-xxl-0 order-1 order-xxl-2 me-xxl-3" onSubmit={handleSearch}>
                <div className="d-flex align-items-center px-3 border rounded-5 search w-100">
                  <span className="text-black border-0 lupa mb-1">
                    <FaSearch className="search-icon me-2" />
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Ciudad, localidad, calle..."
                    className="border-0 search-input ps-0"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Form>

              {/* Enlaces */}
              <Nav
                className="ms-xxl-auto mb-3 mb-xxl-0 order-2 order-xxl-1 me-4"
                navbarScroll
              >
                <Nav.Link as={Link} to="/admin">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/inmuebles">
                  Inmuebles
                </Nav.Link>

                <NavDropdown
                  title="Administrar colaboradores"
                  id="adminColaboradoresDropdown"
                >
                  <NavDropdown.Item as={Link} to="/admin/addUser">
                    Agregar Colaborador
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/editUsers' 
                  >
                    Administrar colaboradores
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Administrar propiedades"
                  id="adminPropiedadesDropdown"
                >
                  <NavDropdown.Item as={Link} to="/admin/addEstate">
                    Crear propiedad
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/allProperties">
                    Editar viviendas
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/allAppraisals'>
                    Editar valoración
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link>Blog</Nav.Link>                 */}
              </Nav>

              {/* desaparecer bandera */}
              <div className="d-flex gap-3 order-3 order-xxl-2 mt-3 mt-xxl-0">
                <NavDropdown
                  title={<FaUser size={25} />}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item as={Link} to="/admin/editProfile">
                    Editar Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/"
                    onClick={() => logOut(!user)}
                  >
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>

                <div className="d-none d-xxl-flex">
                  {/* hay que cambiarlo */}
                  <img
                  className='icons'
                    src="/icons/banderas/españa.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Overlay móvil (capa semitransparente) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay d-xxl-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar móvil (menú lateral móvil)*/}
      <div
        className={`sidebar-collapse d-xxl-none ${sidebarOpen ? 'show' : ''}`}
      >
        {/* Botón cerrar */}
        <div className="d-flex justify-content-end">
          <button
            className="btn-close-custom"
            onClick={() => setSidebarOpen(false)}
          >
            <IoClose size={30} />
          </button>
        </div>

        {/* Logo arriba sidebar */}
        <div className="text-center mb-4">
          <Navbar.Brand as={Link} to="/admin" onClick={() => setSidebarOpen(false)}>
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa Real Estate si clickeas te lleva al navbar"
              className="img-fluid sidebar-logo"              
              width="150px"
            />
          </Navbar.Brand>
        </div>

        {/* Buscador */}
        <Form className="mb-3" onSubmit={handleSearch}>
          <div className="d-flex align-items-center px-3 border rounded-5 search w-100">
            <FaSearch className="me-2" />
            <Form.Control
              type="search"
              placeholder="Ciudad, localidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 search-input ps-0"
            />
          </div>
        </Form>

        {/* Enlaces */}
        <Nav className="flex-column mb-3 sidebar-links">
          <Nav.Link as={Link} to="/admin" onClick={() => setSidebarOpen(false)}>
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/inmuebles"
            onClick={() => setSidebarOpen(false)}
          >
            Inmuebles
          </Nav.Link>
          <>
            <NavDropdown
              title="Administrar colaboradores"
              id="adminColaboradoresDropdown"
            >
              <NavDropdown.Item  as={Link} to='/admin/addUser'
              onClick={() => setSidebarOpen(false)}>
                Agregar Colaborador
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/admin/editUsers'
              onClick={() => setSidebarOpen(false)}>
                Administrar colaboradores
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Administrar propiedades"
              id="adminPropiedadesDropdown"
            >
              <NavDropdown.Item  as={Link} to='/admin/addEstate' 
              onClick={() => setSidebarOpen(false)}>
                Crear propiedad
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to='/admin/allProperties' 
              onClick={() => setSidebarOpen(false)}>
                Editar viviendas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/admin/allAppraisals'
              onClick={() => setSidebarOpen(false)}>
                Editar valoración
              </NavDropdown.Item>
            </NavDropdown>
             {/* <Nav.Link>Blog</Nav.Link>                 */}         
          </>
        </Nav>

        <div className="d-flex gap-4 mt-3">
          <NavDropdown title={<FaUser size={25} />}>
            <NavDropdown.Item
              as={Link}
              to="/admin/editProfile"
              onClick={() => setSidebarOpen(false)}
            >
              Editar Perfil
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => logOut(!user)}>
              Cerrar sesión
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </>
  );
};
