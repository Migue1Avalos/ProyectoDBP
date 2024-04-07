import React from 'react'
import './SearchResults.css'
import { Result } from './Result'

export const SearchResults = ({ results,clearSearch}) => {
  return (
    <div className='result-list'>
        {results.map((result) => {
            return <Result key={result.id} result={result} id={result.id} clearSearch = {clearSearch}/>
        })}
    </div>
  )
}
