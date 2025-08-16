import axios from "axios";
import { useState, useEffect } from "react";

const usePokemonList = (URL) => {
  const DEFAULT_URL = URL;

  console.log(URL);

  const [pokemonListState, setPokemonListState] = useState({
    pokemonLists: [],
    pokeUrl: DEFAULT_URL,
    prevUrl: null,
    nextUrl: null,
    loading: true,
    error: null,
  });

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(pokemonListState.pokeUrl || DEFAULT_URL);

      let pokemonResult = [];

      // Case 1: /pokemon (paginated list)
      if (response.data.results) {
        pokemonResult = response.data.results;
        setPokemonListState((state) => ({
          ...state,
          prevUrl: response.data.previous,
          nextUrl: response.data.next,
        }));
      }

      // Case 2: /types
      else if (response.data.pokemon) {
        pokemonResult = response.data.pokemon.slice(0, 20).map((p) => p.pokemon);
        setPokemonListState((state) => ({
          ...state,
          prevUrl: null, // no prev/next for type endpoint
          nextUrl: null,
        }));
      }

      const pokemonPromise = pokemonResult.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonListData = await axios.all(pokemonPromise);

      const pokemonFinalList = pokemonListData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types,
        };
      });

      setPokemonListState((state) => ({
        ...state,
        pokemonLists: pokemonFinalList,
      }));
    } catch (error) {
      setPokemonListState((state) => ({
        ...state,
        error: error.message || "Failed to fetch Pokémon list",
      }));
    } finally {
      setPokemonListState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [pokemonListState.pokeUrl]);

  return { pokemonListState, setPokemonListState };
};

export default usePokemonList;
