import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AnimeDetails.css'; // Importa el archivo CSS

export const AnimeDetails = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const query = `
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            id
            title {
              romaji
            }
            description
            coverImage {
              large
            }
            bannerImage 
            trailer {
              id
              site
              thumbnail
            }
            
          }
          
        }
      `;

      const variables = {
        id: parseInt(id),
      };

      try {
        const response = await axios.post('https://graphql.anilist.co', {
          query: query,
          variables: variables,
        });

        const animeData = response.data.data.Media;
        if (animeData.bannerImage === null) {
          const randomBanner =require('../images/banner_null.jpg');
      animeData.bannerImage = randomBanner;

        }
        if (animeData.description !== null){
          animeData.description = cleanDescription(animeData.description);
        }
     
        setAnimeDetails(animeData);

      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    // Llama a la función para obtener los detalles del anime cuando el componente se monta
    fetchAnimeDetails();

  }, [id]);

  return (
    <div className="ban">
    {animeDetails && animeDetails.coverImage && (
      <div className="content-wrapper">
        <div className='bannerA' style={{ backgroundImage: `url(${animeDetails.bannerImage})` }}>
          <div className='shadow'></div>
        </div>
        <div className="anime-details">
          <div className='container_Details'>
            <div className='cover_wrap_image'>
            <div className="anime-botton">
                <img src={animeDetails.coverImage.large} alt={animeDetails.title.romaji} className='ImagenAnime' />
                <div className='Addfavorite'>ADD TO FAVORITE</div>
            </div>
            </div>
            <div className="anime-info">
              <h2 className='title'>{animeDetails.title.romaji}</h2>
              <div className='description_container'>
              <p className='description'>Descripción: {animeDetails.description}</p>
                
              </div>
              {animeDetails.trailer && (
                <div className="trailer">
                  <p>Tráiler:</p>
                  <iframe
                    title="Tráiler"
                    src={`https://www.youtube.com/embed/${animeDetails.trailer.id}`}
                    allowFullScreen
      
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    )}
  </div>
  );
  
};
// Funcion para eliminar etiquetas de HTML


function cleanDescription(description) {
  // Eliminar etiquetas HTML
  const cleanText = description.replace(/<[^>]+>/g, '');

  // Eliminar espacios en blanco duplicados y otros caracteres no deseados
  const finalCleanText = cleanText.replace(/\s+/g, ' ').trim();

  return finalCleanText;
}

export default AnimeDetails;
