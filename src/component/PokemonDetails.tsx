import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { pokemons } from "../api/index";
import { PokemonDetails as PokemonDetailsType } from "../types";
import { FaHome } from "react-icons/fa";

const inMemoryCache: { [key: string]: PokemonDetailsType } = {};

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        const cacheKey = `pokemon_details_${id}`;

        const cachedPokemon = inMemoryCache[cacheKey];

        if (cachedPokemon) {
          console.log(`Using cached Pokémon data for ID: ${id}`);
          setPokemon(cachedPokemon);
          setLoading(false);
        } else {
          console.log(`Making API call for Pokémon ID: ${id}`);
          try {
            const pokemonData = await pokemons.getOne(id);
            setPokemon(pokemonData);
            inMemoryCache[cacheKey] = pokemonData;
          } catch (error) {
            console.error("Error fetching Pokémon details:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-lg">No Pokémon found</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-red-600 min-h-screen">
      <div className="mb-6 text-left">
        <Link to={`/pokemon-list?page=${fromPage}`}>
          <FaHome className="text-4xl text-blue-500 hover:text-blue-600 transition duration-300" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center capitalize">
            {pokemon.name}
          </h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="block mx-auto mt-4 w-48 h-48"
          />

          <div className="mt-4 text-center">
            <p className="text-lg">
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p className="text-lg">
              <strong>Weight:</strong> {pokemon.weight}
            </p>

            <div className="mt-4">
              <strong>Types:</strong>
              {pokemon.types.map((typeObj, index) => (
                <span
                  key={index}
                  className="ml-2 inline-block px-3 py-1 bg-yellow-300 rounded-lg text-yellow-800"
                >
                  {typeObj.type.name}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <strong>Abilities:</strong>
              {pokemon.abilities.map((abilityObj, index) => (
                <span
                  key={index}
                  className="ml-2 inline-block px-3 py-1 bg-green-300 rounded-lg text-green-800"
                >
                  {abilityObj.ability.name}
                </span>
              ))}
            </div>

            <dl className="mt-4">
              <strong>Stats:</strong>
              {pokemon.stats.map((statObj, index) => (
                <p key={index} className="mt-2">
                  <strong>{statObj.stat.name}:</strong> {statObj.base_stat}
                </p>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
