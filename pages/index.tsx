import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    interface Pokemon {
        name: string;
        url: string;
    }

    interface PokemonDetails {
        id: number;
        name: string;
        imageUrl: string;
        types: string[];
    }

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemon, setpokemon]= useState<PokemonDetails|null>(null);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
            .then((res) => res.json())
            .then((data) => setPokemons(data.results))
    },[])

    const PokemonClick=async (url: string) => {
        const response = await fetch(url);
        const data= await response.json();
        const {id,name,types}=data;
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        const pokemonDetails:PokemonDetails ={id,name,imageUrl,types:types.map((type:any)=>type.type.name)};
        setpokemon(pokemonDetails);
    }

    return(
        <div>
            <h1>Pokedex</h1>
            <div>
                {pokemons.map(pokemon=>(
                    <button key={pokemon.name} onClick={()=> PokemonClick(pokemon.url)}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2)[0]}.png`} alt={pokemon.name}/>
                        <p>{pokemon.name}</p>
                    </button>
                ))}
            </div>
            {pokemon &&(
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.imageUrl} alt={pokemon.name}/>
                    <p>Typ: {pokemon.types.join(", ")}</p>
                    </div>
            )}
        </div>

);
};
