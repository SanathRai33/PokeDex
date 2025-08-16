import React from 'react'
import './Search.css'
import useDebounce from '../../hooks/useDebounce'

const Search = ({updateSearchTerm}) => {

  const searchDebounce = useDebounce((e) => updateSearchTerm(e.target.value))

  return (
    <div className='Search'>
      <input type='search' placeholder='Which pokemon you are looking?' onChange={searchDebounce} />
    </div>
  )
}

export default Search
