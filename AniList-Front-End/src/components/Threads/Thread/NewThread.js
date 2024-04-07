// NewThread.js
import React, { useRef, useState } from 'react';
import axios from 'axios';
import backendUrl from '../../../ApiConfig';

const NewThread = ({ userId }) => {
  const [nuevoHilo, setNuevoHilo] = useState({ tema: '', contenido: '' });
  const [showButtons, setShowButtons] = useState(false);
  console.log(nuevoHilo.contenido);
  console.log(nuevoHilo.tema);
  const textareaRef = useRef(null); // Titulo
  const textareaRef2 = useRef(null); // Contenido
  
  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    console.log(textarea.scrollHeight);
    textarea.style.height = `auto`; // Establecer la altura según el contenido
    textarea.style.height = `${textarea.scrollHeight}px`; // Establecer la altura según el contenido
    if(textareaRef.current.value.length > 3 && textareaRef2.current.value.length > 3){
      setShowButtons(true);
    }else{
      setShowButtons(false);
    }
  };
  const handleTextareaInput2 = () => {
    console.log('hola');
    const textarea = textareaRef2.current;
    console.log(textarea.value);
    console.log(textarea.scrollHeight);
    textarea.style.height = `auto`; // Establecer la altura según el contenido
    textarea.style.height = `${textarea.scrollHeight}px`; // Establecer la altura según el contenido
    if(textareaRef.current.value.length > 3 && textareaRef2.current.value.length > 3){
      setShowButtons(true);
    }else{
      setShowButtons(false);
    }
  }


  const handleCreateHilo = () => {
    // Realizar una solicitud POST al backend para crear un nuevo hilo
    axios.post(`${backendUrl}/hilos/${userId}`, nuevoHilo)
      .then((response) => {
        // Redirigir al usuario a la página de hilos después de crear el hilo
        window.location.href = '/Threads/'+response.data.id;
      })
      .catch((error) => {
        console.error('Error al crear el hilo:', error);
      });
  };

  return (
    <div className='page_content'>
      <div className='thread'>
        <div className='container'>
          <h2>Crear Nuevo Hilo</h2>
          <div className='form title'>
            <div className='input textarea'>
              <textarea className='textarea__inner'
                placeholder='Título'
                style={{ minHeight: '40px', height: '40px' }}
                value={nuevoHilo.tema}
                onChange={(e) => setNuevoHilo({ ...nuevoHilo, tema: e.target.value })}
                onInput={handleTextareaInput}
                ref={textareaRef}
                rows={1}
              />
            </div>
            <div className='body_editor'>
            <div className='input textarea'>
              <textarea className='textarea__inner'
                placeholder='Write something...'
                style={{ minHeight: '40px', height: '40px' }}
                value={nuevoHilo.contenido}
                onChange={(e) => setNuevoHilo({ ...nuevoHilo, contenido: e.target.value })}
                onInput={handleTextareaInput2}
                ref={textareaRef2}
                rows={1}
              />
            </div>
            </div>
          </div>
          {showButtons && (
              <div className='actions'>
                <div className='button save' onClick={handleCreateHilo}>Save</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NewThread;
