import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Threads.css'
import backendUrl from '../../ApiConfig';

const Threads = ({ userId }) => {
  const [hilos, setHilos] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/hilos`)
      .then((response) => {
        const sortedHilos = response.data.sort((a, b) => {
          // Ordena de forma descendente (de más reciente a más antiguo)
          return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
        });
        setHilos(sortedHilos);
      })
      .catch((error) => {
        console.error('Error al obtener los hilos:', error);
      });
  }, []);
  console.log(hilos);
  const calculateTimeAgo = (createdDate) => {
    const currentDate = new Date();
    const createdDateObj = new Date(createdDate);
    console.log(createdDateObj);
    const timeDifference = currentDate - createdDateObj;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `replied ${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (days > 0) {
      return `replied ${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `replied ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `replied ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `replied ${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };

  return (
    <div className='Page_content_forum'>
      <div className='forum_container'>
      {userId && (
        // Formulario para crear un nuevo hilo
        <a href='/thread/new' className='create_thread'>
            Create Thread
        </a>
      )}
        <div className='feed'>
            {hilos.map((hilo) => (
                <div className='Thread_Card' key={hilo.id}>
                  <a href={'/Threads/' + hilo.id} className='title'> {hilo.tema} </a>
                  <div className='body_preview'>
                    {hilo.contenido}
                  </div>
                  <div className='footer'>
                    <a href={'/user/' + hilo.userNickname} className='avatar_' 
                    style={{
                      backgroundImage: `url(${hilo.image_path !== null ? hilo.image_path : '../images/profile/profile.png'})`,
                       }}                   
                    >
                    </a>
                    <div className='name'>
                      <a href={'/user/' + hilo.userNickname} className='name_nickname'>{hilo.userNickname}</a> 
                      {hilo.fechaCreacion}
                      <p className='time'>{calculateTimeAgo(hilo.fechaCreacion)}  </p>
                    </div>
                    <div className='categories'>

                    </div>
                    <div className='info'>

                    </div>
                  </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Threads;
