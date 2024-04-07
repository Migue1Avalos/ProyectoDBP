import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './styles/Login.css';
import backendUrl from '../../ApiConfig';

export const Login = () => {
  const [error, setError] = useState(null); // Estado para manejar mensajes de error

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/signin`, formData);

      if (response.status === 200) {

      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userName', response.data.nickName);
      localStorage.setItem('userImage', response.data.image_path);
      localStorage.setItem('userBanner', response.data.background_picture);
      console.log(response.data);  
      navigate('/'); // Reemplaza /pagina-principal' con la URL correcta
      window.location.reload();
      } 
    } catch (error) {
      if (error.message === "Network Error"){
        setError('An error occurred. Please try again.');
      }else{
        console.log(error.response.data);
        if (error.response.data.statusCode === 405){
          setError('Incorrect email or password. Please try again.');
  
        }else{
          setError('An error occurred. Please try again.');
        }
      }
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className='Container_Login'>
      <div className="Section_login">
        <div className='login_header'>
          <h2> Sign In</h2>
        </div>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si está presente */}
        <form onSubmit={handleSubmit}>
          <div className='inputBox'>
            <input
              type='text'
              name='email'
              placeholder='Username'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='inputBox'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <div className='forget'>
          <label htmlFor='remember-me'>
            <input type='checkbox' id='remember-me' />Remember Me
          </label>
          <a href='/'>Forgot Password</a>
        </div>
        <div className='register-link'>
          <p>
            Don't have an account?
            <a href="/Register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};
