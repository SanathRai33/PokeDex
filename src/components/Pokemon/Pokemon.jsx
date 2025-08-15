import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'

const Pokemon = ({ id, name, image }) => {
    return (

        <Link to={`/pokemon/${id}`} >
            <div className='pokemon-card' >
                <h4>{name}</h4>
                <div className='card-poster'>
                    <img src={image} alt={name} />
                </div>
            </div>
        </Link>
    )
}

export default Pokemon
