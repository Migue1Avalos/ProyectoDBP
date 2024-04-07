import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

export const SearchBar = ({ setResults ,clearSearch}) => {
  const [input, setInput] = useState('');
  //El estado input se utiliza para rastrear el valor del campo de búsqueda
  const [cancelToken, setCancelToken] = useState(null);
  // cancelToken se utiliza para controlar la cancelación de solicitudes
  // en caso de búsquedas múltiples y rápidas.
  const query = `
    query ($search: String) {
      Page {
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
          }
          description
          coverImage {
            medium
          }
          format
          startDate {
            year
          }
        }
      }
    }
  `;

  // Define la función para buscar animes con cancelación de solicitudes anteriores
  const fetchAnimeData = async (value) => {
    console.log(cancelToken);
    if (cancelToken) {
      // Si hay una solicitud anterior, cancelarla
      cancelToken.cancel('Solicitud cancelada debido a una nueva búsqueda.');
    }

    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    try {
      const response = await axios.post('https://graphql.anilist.co', {
        query: query,
        variables: { search: value },
      }, {
        cancelToken: newCancelToken.token,
      });

      console.log("resultados");
      console.log(value);
      console.log(response.data.data.Page.media); // Imprimir resultados en la consola
      setResults(response.data.data.Page.media);
      clearSearch(value);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Solicitud cancelada:', error.message);
      } else {
        console.error('Error fetching anime data:', error);
      }
    }
  };



  const handleChange = (value) => {
    setInput(value);
    fetchAnimeData(value);
  };

  return (
    <div className='search-bar'>
      <input
        placeholder='Buscar anime...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
