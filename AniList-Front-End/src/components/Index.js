import React from 'react'
import { SearchBarResultados } from './barraBusqueda/SearchBarResultados'
import { TrendingNow } from './ListAnimeMenu/TrendingNow'
import '../components/ListAnimeMenu/styles/SectionAnime.css'
import { PopularSeason } from './ListAnimeMenu/popularSeason'
import { NextSeason } from './ListAnimeMenu/NextSeason'
import { PopularAllTime } from './ListAnimeMenu/PopularAllTime'
export const Index = () => {
      // Verifica si el usuario está autenticado (por ejemplo, si existe un token en localStorage)
  // SearchBarResultados -> PORTADA
  return (
    <div className='Container'>
        <SearchBarResultados/> 
        <div className='ListAnime_Section'>
          <div className='title'>
              <h2>TRENDING NOW</h2>
          </div>
          <TrendingNow/>
          <div className='title'>
              <h2>POPULAR THIS SEASON</h2>
          </div>
          <PopularSeason/>
          <div className='title'>
              <h2>UPCOMING NEXT SEASON</h2>
          </div>
          <NextSeason/>
          <div className='title'>
              <h2>ALL TIME POPULAR</h2>
          </div>
          <PopularAllTime/>
        </div>
    </div>
  )
}

