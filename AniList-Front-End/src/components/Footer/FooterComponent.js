import React from 'react';
import './styles/Footer.css';
export const FooterComponent = () => {
  return (
    <div className='wrap_footer'>
      <div className='Footer'>
        <div className='container'>
          <ul>
            <li><a href='/terminos-y-privacidad'>Términos y Privacidad</a></li>
            <li><a href='/contacto'>Contacto</a></li>
            <li><a href='/donar'>Donar</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
