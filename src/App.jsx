import { Route, Routes } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Pokedex />} />
      <Route path='/pokemon/:id' element={<PokemonDetail />} />
    </Routes>
  )
}

export default App
