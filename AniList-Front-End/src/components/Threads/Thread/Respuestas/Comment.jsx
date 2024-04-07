// Comment.jsx
import React, { useRef, useState } from 'react';
import { ChildenComment } from './ChildenComment';
import axios from 'axios';
import backendUrl from '../../../../ApiConfig';

export const Comment = ({ comment, depth = 0}) => {
  const [editorState, setEditorState] = useState(false);
  const [editorContent, setEditorContent] = useState(''); // Nuevo estado para el contenido del editor
  const textareaRef = useRef(null);
  const userId = localStorage.getItem('userId');
  const toggleEditorState = () => {
    console.log("toggleEditorState");
    setEditorState(!editorState);
  };
  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    setEditorContent(textarea.value); // Actualiza el estado con el contenido del editor
    textarea.style.height = `auto`;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleRespuestaSubmit = () => {
    // Verifica que el contenido del editor tenga al menos 10 caracteres
  if (editorContent.length < 10) {
      alert('El contenido debe tener al menos 10 caracteres.');
      return;
    }
// Enviar la respuesta al backend
axios.post(`${backendUrl}/respuestas/${userId}/${comment.hiloId}`, { contenido: editorContent, respuestaPadreId: comment.id })
  .then((response) => {
    // Actualizar la vista o realizar cualquier acción necesaria después de enviar la respuesta
    console.log('Respuesta enviada con éxito:', response.data);
    window.location.reload();

  })
  .catch((error) => {
    console.error('Error al enviar la respuesta:', error);
  });
};
  const calculateTimeAgo = (createdDate) => {
    const currentDate = new Date();
    const createdDateObj = new Date(createdDate);
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
    <>
        <div className={`comment-editor ${editorState ? 'active':''}`}>
          <div className='wrap_comment_editor'>
            <div className='editor'>
              <div className='input textarea'>
              <textarea
              autoComplete='off'
              style={{ minHeight: '120px', height: '120px' }}
              className='textarea__inner'
              placeholder='What are you thinking?'
              onInput={handleTextareaInput}
              rows={1}
              ref={textareaRef}
            ></textarea>
              </div>
              <div className='actions'>
                <div className='button cancel' onClick={toggleEditorState}>Cancel</div>
                <div className='button comment' onClick={handleRespuestaSubmit} >Send</div>                 
              </div>
            </div>
            <div className='preview' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>
              <h2 className='prev'>Preview:</h2>
              <p className='prev_content'>{editorContent}</p>
            </div>
          </div>
        </div>
      <div className={`comment`}>
        <div className='header_comment'>
            <a href={`/user/${comment.nickname}/`} className='user'>
                <div className='avatar' style={{
                      backgroundImage: `url(${comment.imagen !== null ? comment.imagen : '../../../images/profile/profile.png'})`,
                    }}    
                />{comment.nickname}
            </a>
            <div className='info'>
                <p className='time'>{calculateTimeAgo(comment.fechaCreacion)}  </p>
            </div>
        </div>
        <div className='markdown_comment' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>
        {comment.contenido}
        </div>
        {userId && 
        <div className='actions'>
            <div className='button like'>Like</div>
            <div className='button reply' onClick={toggleEditorState}>Reply</div>
            <div className='button report'>Report</div>
        </div>
        }
       
      </div>
      {comment.subRespuestaIds && comment.subRespuestaIds.length > 0 && (
        <div className='children'>
          <ChildenComment comment_id={comment.id} depth={depth + 1} />
        </div>
      )}
    </>
  );
}
