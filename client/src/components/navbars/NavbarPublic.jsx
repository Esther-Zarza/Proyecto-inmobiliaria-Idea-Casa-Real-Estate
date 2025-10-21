import { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { FaUser, FaSearch } from 'react-icons/fa';
import { IoClose, IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './navbars.css';
import { useNavigate } from 'react-router-dom';

export const NavbarPublic = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    //recortar espacios búsqueda. trimmed = recorte
    const trimmed = search.trim();
    if (!trimmed) return;
    navigate(`/inmuebles?ubicacion=${encodeURIComponent(trimmed)}`); //codifica el texto para que sea seguro -> espacios, acéntos...
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
          <Navbar.Brand as={Link} to="/" className="mx-auto d-xxl-block">
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa Real Estate si clickeas te lleva al navbar"              
              width="180px"
            />
          </Navbar.Brand>

          {/* Bandera */}
          <div className="d-xxl-none">
            <img className='icons' src="/icons/banderas/españa.svg" alt="" />
          </div>

          {/* Collapse */}
          <Navbar.Collapse id="navbarScroll" className="d-none d-xxl-flex">
            <div className="d-flex flex-column flex-xxl-row w-100 align-items-start align-items-text-xxl-end">
              {/* Buscador */}
              <Form
                className="mb-3 mb-xxl-0 order-1 order-xxl-2 me-xxl-3"
                onSubmit={handleSearch}
              >
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
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/inmuebles">
                  Inmuebles
                </Nav.Link>
                <Nav.Link as={Link} to="/AddAssessment">
                  Valora tu inmueble
                </Nav.Link>
                <Nav.Link as={Link} to="/misFavoritos">
                  Mis favoritos
                </Nav.Link>
               {/* <Nav.Link>Blog</Nav.Link>                 */}
                <Link                  
                  to="/#formcontacto"
                  className="ancla align-content-center ps-2"
                >
                  Contacto
                </Link> 
              </Nav>

              {/* desaparecer bandera */}
              <div className="d-flex gap-3 order-3 order-xxl-2 mt-3 mt-xxl-0">
                <NavDropdown
                  title={<FaUser size={25} />}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item as={Link} to="/login">
                    Iniciar sesión
                  </NavDropdown.Item>
                </NavDropdown>

                <div className="d-none d-xxl-flex">
                  {/* hay que cambiarlo */}
                  <img
                    className="icons"
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
          <Navbar.Brand as={Link} to="/" onClick={() => setSidebarOpen(false)}>
            <img
              src="/images/logos/logo-navbar.png"
              alt="Logo de IdeaCasa Real Estate si clickeas te lleva al navbar"              
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
              className="border-0 search-input ps-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Form>

        {/* Enlaces */}
        <Nav className="flex-column mb-3 sidebar-links ">
          <Nav.Link as={Link} to="/" onClick={() => setSidebarOpen(false)}>
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/inmuebles"
            onClick={() => setSidebarOpen(false)}
          >
            Inmuebles
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/addAssessment"
            onClick={() => setSidebarOpen(false)}
          >
            Valora tu inmueble
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/misFavoritos"
            onClick={() => setSidebarOpen(false)}
          >
            {' '}
            Mis favoritos{' '}
          </Nav.Link>
           {/* <Nav.Link>Blog</Nav.Link>                 */}
           <Link            
            to="/#formcontacto"
            className="ancla align-content-center ps-2"
            onClick={() => setSidebarOpen(false)}
          >
            Contacto
          </Link> 
        </Nav>
        <Nav.Link
          as={Link}
          to="/login"
          onClick={() => setSidebarOpen(false)}
          className="d-flex align-items-center"
        >
          <FaUser
            size={20}
            className="me-2"
            as={Link}
            to="/login"
            onClick={() => setSidebarOpen(false)}
          />
          Identíficate
        </Nav.Link>
      </div>
    </>
  );
};
