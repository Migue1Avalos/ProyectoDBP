import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import backendUrl from '../../../../ApiConfig';

export const Overview = () => {
  const { name } = useParams();
  console.log(name);
  const [showButtons, setShowButtons] = useState(false);
  const textareaRef = useRef(null);
  const [menuVisibleFilter, setMenuVisible] = useState(false);
  const [editorContent, setEditorContent] = useState(''); // Nuevo estado para el contenido del editor
  const [containerFeed, setContainerFeed] = useState([]); // Nuevo estado para el contenido del editor
  
  console.log(localStorage.getItem('userId'));
  const toggleMenu = () => {
    setMenuVisible(!menuVisibleFilter);
  };

  // ACTIVITY FEED:
  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect");
      console.log(name);
  
      try {
        const response = await axios.get(`${backendUrl}/estados/` + name);
        if (response.status === 200) {
          console.log('Publicación enviada con éxito:', response.data);
          // Invertir el orden de la lista antes de establecer el estado
          const reversedData = response.data.reverse();
          setContainerFeed(reversedData);
        } else {
          console.log('Error en la solicitud:', response.status);
        }
      } catch (error) {
        console.error('Error al enviar la publicación:', error.message);
      }
    };
  
    fetchData(); // Llamada a la función asíncrona
  }, [name]); // Asegúrate de incluir 'name' en la lista de dependencias si lo 
  
  // renderComponent
  const renderContent = (user) => {
    return user.contenidos_url.map(item => {
      if (item.toLowerCase().includes('http')) {
        // Si es una URL, asumir que es una imagen
        return <img key={item} src={item} alt="imagen" className='img_states'/>;
      } else {
        // Si no es una URL, considerarlo como texto
        return <p key={item} className='text_states'>{item}</p>;
      }
    });
  };
  

  const handleTextareaInput = (e) => {
    const textarea = textareaRef.current;
    setEditorContent(e.target.value); // Actualiza el estado con el contenido del editor
    console.log(textarea.scrollHeight);
   // Ajusta la altura del textarea dinámicamente
   textarea.style.height = 'auto'; // Restablecer la altura
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const handleTextareaClick = () => {
    setShowButtons(true);
  };

  const handleCancelClick = () => {
    setShowButtons(false);
    // Borrar el contenido del textarea
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = '40px  '; // Restablecer la altura
    }
    setEditorContent('');
  };


  const handleInsertImage = () => {
    const imageUrl = prompt('Enter image URL:');
    const textarea = textareaRef.current;
    if (imageUrl) {
      if(editorContent === ''){
        setEditorContent(`img220(${imageUrl})`);
        textarea.style.height = `${textarea.scrollHeight}px`;
      }else{
        const newContent = `${editorContent}\nimg220(${imageUrl})`;
        setEditorContent(newContent);
        textarea.style.height = `${textarea.scrollHeight +24}px`;
      }
     // Ajusta la altura del textarea dinámicamente

     console.log(textarea.scrollHeight);

    }
  };
  const extractTextAndImages = () => {
    const lines = editorContent.split('\n');
    const textAndImages = lines.flatMap(line => {
      if (line.trim() === '') {
        // Ignorar líneas vacías
        return [];
      }
  
      const matches = line.match(/(.*?)(img220\(([^)]*)\))(.*)/);
  
      if (matches) {
        const [, textBefore, imagePart, imageUrl, textAfter] = matches;
        const result = [
          { type: 'text', content: textBefore.trim() },
          { type: 'image', content: imageUrl.trim() },
          { type: 'text', content: textAfter.trim() }
        ];
        if(imagePart === '') {
          console.log("imagePart"); 
        }
        // Filtrar elementos vacíos
        return result.filter(item => item.content !== '');
      }
  
      return { type: 'text', content: line.trim() };
    });
  
    return textAndImages;
  };
  const textAndImages = extractTextAndImages();
  const textContentArray = textAndImages.map(item => item.content);
  console.log(textContentArray.length);

  // Fetch para enviar el contenido del editor al backend
 
  const handlePublishClick = () => {
    // Agrega lógica para procesar la publicación aquí
    setShowButtons(false);
     // Borrar el contenido del textarea
     if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = '40px'; // Restablecer la altura
    }
    if(textContentArray.length < 1){
      return;
    }
    try {
      const response =  axios.post(`${backendUrl}/estados/`+name, { contenidos_url: textContentArray });
      if (response.status === 200) {
        console.log('Publicación enviada con éxito:', response.data);
      }
    } catch (error) {
      console.error('Error al enviar la publicación:', error);
    }
    setEditorContent('');

  };

  const calculateTimeAgo = (createdDate) => {
    const currentDate = new Date();
    console.log(currentDate);
    const createdDateObj = new Date(createdDate);
    console.log("createdDateObj");
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
    <div className='overview'>
      <div className='section'>
        <div className='aboutme'>
          <h2 className='section_header'>About me</h2>
          <div className='content_about'>
            <p>hola </p>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='activity'>
          <h2 className='section_header'>
            Activity
            <div className='dropdown'>
              <div className='selected' onClick={toggleMenu}>
                <span className='filter'>Filter▾</span>
              </div>
           
                <ul className={`menu_filter ${menuVisibleFilter ? 'active' : ''}`}>
                  <li>All</li>
                  <li>Status</li>
                  <li>Messages</li>
                </ul>
     
              </div>
          </h2>

          <div className='activity_edit'>
            {showButtons && (
            <div className='markdown_editor'>
              <ion-icon name="image-outline" id="imagen_icon" onClick={handleInsertImage}></ion-icon>
              <ion-icon name="logo-youtube" id="youtube"></ion-icon>
            </div>                
            )}

            <div className='input textarea'>
            <textarea
            autoComplete='off'
            style={{ minHeight: '40px', height: '40px' }}
            className='textarea__inner'
            placeholder='What are you thinking?'
            onClick={handleTextareaClick}
            onInput={handleTextareaInput}
            rows={1}
            ref={textareaRef}
            value={editorContent}        
            ></textarea>
            </div>
            {showButtons && (
              <div>
              <div className='actions'>
                <div className='button cancel' onClick={handleCancelClick}>Cancel</div>
                <div className='button save' onClick={handlePublishClick}>Publish</div>
              </div>
              <div className='preview' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>
              <h2 className='prev'>Preview:</h2>
              <div className='textContainer'>
                <div className='textprev'>
                  <div className='prevText_markdown'>
                      <div className='prev_content'>
                      {textAndImages.map((item, index) => (
                        item.type === 'text' ? (
                          <p key={index} className='prev_content2'>{item.content}</p>
                        ) : (
                            <img className='previewImg' key={index} src={item.content} alt={`inserted ${index + 1}`} />
                        )
                      ))}
                      </div>
                  </div>
                </div>
              </div>
            </div>
              </div>


            )
            }
          </div>
          <div className='activity_feed'>
              {containerFeed.map((item, index) => (
                <div className='activity_item' key={index}>
                  <div className='wrap_feed'>
                    <div className='text_feed'>
                      <div className='header'>
                        <a href="/" className='user'>
                              <div className='avatar' style={{
                                    backgroundImage: `url(${item.user_profile_picture !== null ? item.user_profile_picture : '../../../images/profile/profile.png'})`,
                                  }}    
                              />{item.nickname}
                          </a>
                          <div className='info'>
                            <p className='time'>{calculateTimeAgo(item.fechaCreacion)}</p>
                          </div>
                      </div>
                      <div className='text_container_render'>
                        {renderContent(item)}
                      </div>

                      </div>
                    </div>

                  </div>
              ))}
              
          </div>
        </div>
      </div>
    </div>
  );
};
