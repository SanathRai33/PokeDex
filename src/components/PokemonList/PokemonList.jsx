import React from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

const PokemonList = ({URL}) => {

  const { pokemonListState, setPokemonListState } = usePokemonList(URL);

  if (pokemonListState.loading) {
    return <div className="loading">Loading Pokémon List...</div>;
  }

  if (pokemonListState.error) {
    return <div className="error">⚠️ {pokemonListState.error}</div>;
  }

  return (
    <div className="PokemonList">
      <h2>Pokémon Lists</h2>

      <div className="control-btns">
        <button
          disabled={!pokemonListState.prevUrl}
          onClick={() =>
            setPokemonListState(state => ({ ...state, pokeUrl: state.prevUrl }))
          }
        >
          Prev
        </button>
        <button
          disabled={!pokemonListState.nextUrl}
          onClick={() =>
            setPokemonListState(state => ({ ...state, pokeUrl: state.nextUrl }))
          }
        >
          Next
        </button>
      </div>

      <div className="pokemon-card-container">
        {pokemonListState.pokemonLists.map((pokemon, idx) => (
          <Pokemon
            key={idx}
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
