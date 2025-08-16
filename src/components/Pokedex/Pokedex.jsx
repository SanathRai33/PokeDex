import React from 'react'
import './PokeDex.css'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'

const Pokedex = () => {
  
    const URL = "https://pokeapi.co/api/v2/pokemon";

  return (
    <div className='Pokedex'>
      <h1>POKEDEX</h1>
      <Search />
      <PokemonList URL={URL} />
    </div>
  )
}

export default Pokedex
