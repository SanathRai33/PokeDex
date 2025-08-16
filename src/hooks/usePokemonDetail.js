import { useEffect, useState } from "react";
import axios from "axios";

const usePokemonDetail = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    async function fetchPokemonDetail() {
      try {
        setLoading(true);
        const response = await axios.get(POKEMON_URL);
        const data = response.data;

        setPokemon({
          id: data.id,
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          types: data.types.map((t) => t.type.name),
          height: data.height,
          weight: data.weight,
        });
        
      } catch (err) {
        setError(err.message || "Failed to fetch Pokémon data");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetail();
  }, [id]);

        // console.log("pokemon", pokemon?.types[0])
        // const res = await axios.get(`https://pokeapi.co/api/v2/type/${pokemon.types[0]}`);
        // console.log(res.data);
  return { pokemon, loading, error };
};

export default usePokemonDetail;
