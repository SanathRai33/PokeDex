import React, { useState } from 'react'
import './PokeDex.css'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'
import PokemonDetail from '../PokemonDetail/PokemonDetail'

const Pokedex = () => {
  
    const URL = "https://pokeapi.co/api/v2/pokemon";

    const [ searchTerm, setSearchTerm ] = useState('');

  return (
    <div className='Pokedex'>
      <h1>POKEDEX</h1>
      <Search updateSearchTerm={setSearchTerm} />
      {
        searchTerm ? <PokemonDetail name={searchTerm} /> : <PokemonList URL={URL} />
      }
    </div>
  )
}

export default Pokedex
