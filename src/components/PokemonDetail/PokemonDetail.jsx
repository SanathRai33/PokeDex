import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePokemonDetail from "../../hooks/usePokemonDetail"; // custom hook
import "./PokemonDetail.css";
import PokemonList from "../PokemonList/PokemonList";
import axios from "axios";

const PokemonDetail = () => {
    const { id } = useParams();
    const { pokemon, loading, error } = usePokemonDetail(id);

    if (loading) {
        return <div className="loading">Loading Pokémon...</div>;
    }

    if (error) {
        return <div className="error">⚠️ {error}</div>;
    }

    if (!pokemon) {
        return <div className="error">No Pokémon found</div>;
    }

    const URL = `https://pokeapi.co/api/v2/type/${pokemon?.types[0]}`

    return (
        <div className="PokemonDetail">
            <div className={`pokemon-detail-card types-${pokemon.types[0]}`}>
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <div className="pokemon-info">
                    <div className="pokemon-hw">
                        <p>Height: {pokemon.height}m</p>
                        <p>Weight: {pokemon.weight}kg</p>
                    </div>
                    <div className="pokemon-types">
                        {pokemon.types.map((type, idx) => (
                            <span key={idx} className={`type-badge type-${type}`}>
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h4>
                    Type {pokemon.types[0]} 
                </h4>
            </div>
            <PokemonList URL={URL} />
        </div>
    );
};

export default PokemonDetail;
