import React from 'react';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper.js';
import { loginSchema } from '../../../schemas/loginSchemas.js';
import { ZodError } from 'zod';
import { useContext } from 'react';
import { AuthContext} from '../../../context/AuthContextProvider.jsx';
import { useEffect } from 'react';
import './formLogin.css';


const initialValue = {
  email: '',
  password: '',
  user_name: '',
  user_last_name: '',
  user_phone: '',
  user_dni: '',
  cif: '',
};

export const FormLogin = () => {
  const [login, setLogin] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const {user, setUser, setToken, setLoginIn, loginIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[])

  const onSubmit = async () => {
   
    try {
      const loginData = loginSchema.parse(login);

      const res = await fetchData('/login', 'POST', loginData);

      const token = res.data.token;

      //guardar token en el localStorage
      localStorage.setItem('token', token);

      //hacer una petición al back para traerme los datos de usuarios
      const resLogin = await fetchData('/getUserByToken', 'GET', null, token);
      setUser(resLogin.data.user);
      setToken(token);
      setLoginIn(!loginIn);
      setValErrors({});

   
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        
        const fieldErrors = {};
        error.issues.forEach((elem) => {
          fieldErrors[elem.path[0]] = elem.message;
        });

        setValErrors(fieldErrors);
      } else if (error.response.status === 401) {
        setValErrors({ error: error.response.data.message });
        
      }
    }
  };

  return (
    <Container>
       <div className="text-center p-5 text-white">
        <h2>Login de colaboradores</h2>
        <div className="line-title-white m-auto"></div>
      </div>
      <Form className="form-container">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="emailInput">Email</Form.Label>
          <Form.Control
            id="emailInput"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={login.email}
          />
          {valErrors?.email && (
            <Form.Text className="text-danger">{valErrors.email}</Form.Text>
          )}
          {valErrors?.error === 'Email no registrado' && (
            <Form.Text className="text-danger">
              {valErrors.error}
            </Form.Text>
          )}
        
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="pe-2" htmlFor="passwordInput">
            Contraseña
          </Form.Label>
          <span onClick={viewPassword}>
            {showPassword ? (
              <i className="bi bi-eye"></i>
            ) : (
              <i className="bi bi-eye-slash"></i>
            )}
          </span>
          <Form.Control
            id="passwordInput"
            type={!showPassword ? 'password' : 'text'}
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            value={login.password}
          />
          {valErrors?.password && (
            <Form.Text className="text-danger">Contraseña incorrecta</Form.Text>
          )}
          {valErrors?.error === 'Contraseña incorrecta' && (
            <Form.Text className="text-danger">
              {valErrors.error}
            </Form.Text>
          )}
          {valErrors?.error === 'La cuenta ha sido borrada' && (
            <Form.Text className="text-danger">
              {valErrors.error}
            </Form.Text>
          )}
          {valErrors?.error === 'La cuenta no ha sido confirmada' && (
            <Form.Text className="text-danger">
              {valErrors.error}
            </Form.Text>
          )}
        </Form.Group>
        <div className="text-center">
          <button type="button" className="btn-1 me-2" onClick={onSubmit}>
            Entrar
          </button>
          <button type="button" className="btn-2" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
        <div>
          <p className="mt-2">
            ¿Has olvidado la contraseña? <Link to="/recoverPassword">Haz click aquí</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};
