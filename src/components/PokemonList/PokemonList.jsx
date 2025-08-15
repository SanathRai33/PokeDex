import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './PokemonList.css'

const PokemonList = () => {

    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    const [ pokemonLists, setPokemonLists ] = useState([])
    const [ pokeUrl, setPokeUrl ] = useState(DEFAULT_URL);
    const [ prevUrl, setPrevUrl ] = useState(DEFAULT_URL);
    const [ nextUrl, setNextUrl ] = useState(DEFAULT_URL);


    const fetchPokemon = async () => {

        const response = await axios.get(pokeUrl? pokeUrl : DEFAULT_URL);

        const pokemonResult = response.data.results;

        setPrevUrl(response.data.previous)
        setNextUrl(response.data.next)

        const pokemonPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        const pokemonListData = await axios.all(pokemonPromise)

        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            }
        })
        setPokemonLists(pokemonFinalList)


        console.log(pokemonFinalList)
        console.log(pokemonLists)

    }

    useEffect(() => {
        fetchPokemon()
    }, [pokeUrl])

    return (
        <div className='PokemonList'>
            <div>
                <h2>Pokemon Lists</h2>
            </div>
            <div className='control-btns'>
                <button onClick={()=> setPokeUrl(prevUrl)}>Prev</button>
                <button onClick={() => setPokeUrl(nextUrl)}>Next</button>
            </div>
            <div className='pokemon-card-container'>
                {
                    pokemonLists.map((pokemon, idx) => (
                        <div key={idx} className='pokemon-card' >
                            <h4>{pokemon.name}</h4>
                            <div className='card-poster'>
                                <img src={pokemon.image} alt={pokemon.name} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PokemonList
