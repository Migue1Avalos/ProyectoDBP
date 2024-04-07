import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import backendUrl from '../../ApiConfig';
export const Register = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/signup`, formData);

      if (response.status === 200) {
        navigate('/'); 
      }
      console.log(response.status); 
    } catch (error) {
      console.log(error.response); // Muestra la respuesta del servidor
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className='Container_Register'>
      <div className="Section_register">
        <div className='register_header'>
          <h2> Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputBox'>
            <input
              type='text'
              name='nickname'
              placeholder='Nickname'
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className='inputBox'>
            <input
              type='email'
              name='email'
              placeholder='Email'
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
          <button type='submit'>Register</button>
        </form>
        <div className='login-link'>
          <p>
            Already have an account?
            <a href="/Login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};
