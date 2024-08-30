import { useEffect, useState } from "react";
import './PokemonList.css';
import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const [pokemonList, setPokemonList] =  useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    async function downlaodPokemons(params) {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResults = response.data.results;
       const pokemonResultsPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url));
       const pokemonData = await axios.all(pokemonResultsPromise)
       console.log(pokemonData);
       const res = pokemonData.map((pokeData)=>{
        const pokemon = pokeData.data;
        return {
            id:pokemon.id,
            name: pokemon.name,  
            image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :  pokemon.sprites.front_shiny,
            types: pokemon.types
        }
       });
       console.log(res);
       setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(()=>{
            downlaodPokemons();
    }, [])


    return (

        <div className="pokemon-list-wrapper">
       
            <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading.......' : 
                pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} />)
            }
            </div>

            <div className="contorls">
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;