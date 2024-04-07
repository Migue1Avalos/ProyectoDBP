import React from 'react'
import './Result.css'
import { Link ,useNavigate} from 'react-router-dom'
export const Result = ({result, clearSearch }) => {
  const navigate = useNavigate();
  const handleAnimeClick = () => {
    navigate('/anime/'+result.id)
    window.location.reload();

  }

  return (
    <div className='result'>
    <Link to={`/anime/${result.id}`} className='search-result' onClick={handleAnimeClick}>
      
      <img src={result.coverImage.medium} alt={result.title.romaji}></img>
      
      <div className='name'>
        {result.title.romaji}
        <div className='info'>
          {result.startDate.year} {result.format}
        </div>
      </div>
    </Link>
    </div>
    )
}
