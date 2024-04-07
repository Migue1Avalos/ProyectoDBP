import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slick from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const TrendingNow = () => {
  const [trendingAnimeData, setTrendingAnimeData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://graphql.anilist.co';
    const queryText = `
      query {
        Page {
          media(season: FALL, seasonYear: 2023, type: ANIME, sort: TRENDING_DESC, isAdult: false) {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
            averageScore
            genres
          }
        }
      }
    `;

    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          query: queryText,
        });

        setTrendingAnimeData(response.data.data.Page.media);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    pauseOnHover:true,

  };
  

  return (
    <div className='trending-anime-list'>
      <Slick {...settings}>
        {trendingAnimeData.map((anime, index) => (
          <div key={index} className='AnimeActivity'>
            <div className='hover-data-right'>
              {anime.title.romaji}
              <div className='score'>
                <img className='iconImage' alt='' src={anime.averageScore !== null ?
                  (anime.averageScore > 75 ? 'images/score/smile-regular-24.png' :
                    (anime.averageScore > 60 && anime.averageScore < 76 ? 'images/score/meh-regular-24.png' :
                      'images/score/sad-regular-24.png')
                  ) : ''}>
                </img>
                <div className='percentage'>
                  {anime.averageScore!==null?(anime.averageScore + '%'):''}
                </div>
              </div>
              <div className="genres">
                {anime.genres.map((genero, genreIndex) => (
                  <div key={genreIndex} className="genere">
                    {genero}
                  </div>
                ))}
              </div>
            </div>
            <a className='cover2' href={'anime/' + anime.id}>
              <img className='anime-image2' alt='' src={anime.coverImage.large}></img>
            </a>
            <h2 className='anime-title2'>{anime.title.romaji}</h2>
          </div>
        ))}
      </Slick>
    </div>
  );
};
