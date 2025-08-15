import React from 'react'
import './PokeDex.css'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'

const Pokedex = () => {
  return (
    <div className='Pokedex'>
      <h1>POKEDEX</h1>
      <Search />
      <PokemonList />
    </div>
  )
}

export default Pokedex
