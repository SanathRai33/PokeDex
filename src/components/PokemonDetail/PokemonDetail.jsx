import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css'; // External CSS

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();
    const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

    async function fetchPokemonDetail() {
        const response = await axios.get(POKEMON_URL);
        const data = response.data;

        setPokemon({
            id: data.id,
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            types: data.types.map(t => t.type.name),
            height: data.height,
            weight: data.weight
        });
    }

    useEffect(() => {
        fetchPokemonDetail();
    }, []);

    if (!pokemon) {
        return <div className="loading">Loading Pokémon...</div>;
    }

    return (
        <div className='PokemonDetail'>
            <div className="pokemon-detail-card">
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <p className="pokemon-id">#{pokemon.id}</p>
                <div className="pokemon-info">
                    <p><strong>Height:</strong> {pokemon.height} m</p>
                    <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                    <div className="pokemon-types">
                        {pokemon.types.map((type, idx) => (
                            <span key={idx} className={`type-badge type-${type}`}>
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
