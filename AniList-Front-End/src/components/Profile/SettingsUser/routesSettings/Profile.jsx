import React, { useRef, useState } from 'react'
import axios from 'axios';
import backendUrl from '../../../../ApiConfig';

export const Profile = ({userId}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [file_, setFile] = useState('');

  const [fileBanner, setFileBanner] = useState('');
  const [bannerSrc, setBannerSrc] = useState('');
  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = `auto`; // Establecer la altura según el contenido
    textarea.style.height = `${textarea.scrollHeight}px`; // Establecer la altura según el contenido
    
    if(textarea.value.length > 0){
        setShowButtons(true);
    }else{
        setShowButtons(false);

    }

};
    const textareaRef = useRef(null);
      const handleCancelClick = () => {
        setShowButtons(false);
        // Borrar el contenido del textarea
        if (textareaRef.current) {
            textareaRef.current.value = '';
            textareaRef.current.style.height = '35px';
          }
      
          setImageSrc(''); // Limpiar la imagen cargada
      };
    
      const handleSavehClick =async (e) => {
        e.preventDefault();

        // Agrega lógica para procesar la publicación aquí
        setShowButtons(false);
         // Borrar el contenido del textarea
         if (textareaRef.current) {
          textareaRef.current.value = '';
          textareaRef.current.style.height = '35px'; // Restablecer la altura
        }
        const formData = new FormData();
        formData.append("file", file_);
        formData.append("pictureType", "profile");
        try {
            const response = await axios.post(`${backendUrl}/usuarios/`+userId+'/upload-picture', formData);
      
            if (response.status === 200) {
                console.log("post image");
                console.log(response.data);
                if(response.data.image_path !== null){
                  localStorage.setItem('userImage', response.data.image_path);
                }
            }
            console.log(response.status); 
          } catch (error) {
            console.log(error.response); // Muestra la respuesta del servidor
            // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
            console.error('Error al registrar:', error);
          }
            const formDataBanner = new FormData();
            formDataBanner.append("file", fileBanner);
            formDataBanner.append("pictureType", "background");

            try {
                const response = await axios.post(`${backendUrl}/usuarios/`+userId+'/upload-picture', formDataBanner);
          
                if (response.status === 200) {
                    console.log("post banner");
                    console.log(response.data);
                    if(response.data.background_picture !== null){
                      localStorage.setItem('userBanner', response.data.background_picture);
                    }
                }
                console.log(response.status); 
              } catch (error) {
                console.log(error.response); // Muestra la respuesta del servidor
              }
              setBannerSrc('');
              setImageSrc(''); // Limpiar la imagen cargada
              window.location.reload();
            }


      

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setImageSrc(e.target.result);
            setShowButtons(true); // Mostrar botones cuando se carga la imagen
          };
          reader.readAsDataURL(file);
        
        }
      };

      // handleImageChangeBanner
      const handleBannerChange = (event) => {
        const file = event.target.files[0];
        if (file) {
         setFileBanner(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setBannerSrc(e.target.result);
            setShowButtons(true); // Mostrar botones cuando se carga la imagen
          };
          reader.readAsDataURL(file);
        
        }
      };
  return (
    <div className='profile'>
        <div className='section'>
            <h2 className='section_title'>About</h2>
            <div className='markdown_editor'></div>
            <div className='about textarea'>
            <textarea
            autoComplete='off'
            style={{ minHeight: '35px', height: '35px' }}
            className='textarea__inner'
            placeholder='About Me'
            onInput={handleTextareaInput}
            rows={1}
            ref={textareaRef}
          ></textarea>
            </div>

        </div>
        <div className='section'>
            <h2 className='section_title'>Upload Image</h2>

            <div className='container_image'>
            <div className='dropbox'>
            <input type='file' onChange={handleImageChange} accept='image/*' className='input_file'/>
            <p>Upload Image</p>
            </div>
            {imageSrc && (
            <div className='prev_image'>
            <img src={imageSrc} alt='Preview' style={{ maxWidth: '200px' }} />
            </div>
            )}
            </div>
     
        </div>
        <div className='section'>
            <h2 className='section_title'>Upload Banner</h2>
            <div className='container_image'>
            <div className='dropbox'>
            <input type='file' onChange={handleBannerChange} accept='image/*' className='input_file'/>
            <p>Upload Image</p>
            </div>
            {bannerSrc && (
            <div className='prev_image'>
            <img src={bannerSrc} alt='Preview' style={{ maxWidth: '600px' }} />
            </div>
            )}
            </div>
        </div>
        {showButtons && (
              <div className='actions'>
                <div className='button save' onClick={handleSavehClick}>Save</div>
                <div className='button cancel' onClick={handleCancelClick}>Cancel</div>
              </div>
        )}
    </div>
  )
}
