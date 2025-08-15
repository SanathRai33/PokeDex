import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

const PokemonList = () => {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    const [pokemonListState, setPokemonListState] = useState({
        pokemonLists: [],
        pokeUrl: DEFAULT_URL,
        prevUrl: null,
        nextUrl: null,
    });

    const fetchPokemon = async () => {
        const response = await axios.get(pokemonListState.pokeUrl || DEFAULT_URL);

        const pokemonResult = response.data.results;

        setPokemonListState(state => ({
            ...state,
            prevUrl: response.data.previous,
            nextUrl: response.data.next
        }));

        const pokemonPromise = pokemonResult.map(pokemon => axios.get(pokemon.url));
        const pokemonListData = await axios.all(pokemonPromise);

        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            };
        });

        setPokemonListState(state => ({
            ...state,
            pokemonLists: pokemonFinalList
        }));
    };

    useEffect(() => {
        fetchPokemon();
    }, [pokemonListState.pokeUrl]);

    return (
        <div className='PokemonList'>
            <h2>Pokemon Lists</h2>
            <div className='control-btns'>
                <button 
                    disabled={!pokemonListState.prevUrl}
                    onClick={() => setPokemonListState(state => ({
                        ...state,
                        pokeUrl: state.prevUrl
                    }))}>
                    Prev
                </button>
                <button 
                    disabled={!pokemonListState.nextUrl}
                    onClick={() => setPokemonListState(state => ({
                        ...state,
                        pokeUrl: state.nextUrl
                    }))}>
                    Next
                </button>
            </div>
            <div className='pokemon-card-container'>
                {pokemonListState.pokemonLists.map((pokemon, idx) => (
                    <Pokemon key={idx} name={pokemon.name} image={pokemon.image} id={pokemon.id} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
