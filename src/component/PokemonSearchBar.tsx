import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pokemons } from "../api/index";
import { PokemonListItem } from "../types";

const inMemoryCache: { [key: string]: PokemonListItem[] } = {};

const PokemonSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (name: string) => {
    setLoading(true);
    const cacheKey = `pokemon_list_all`;

    const cachedPokemonList = inMemoryCache[cacheKey];

    if (cachedPokemonList) {
      console.log(`Using cached Pokémon list for search`);
      filterAndSetSuggestions(cachedPokemonList, name);
      setLoading(false);
    } else {
      console.log(`Making API call to fetch Pokémon list for search`);
      try {
        const response = await pokemons.getList(0, 1000);
        const allPokemonList = response.results;
        inMemoryCache[cacheKey] = allPokemonList;
        filterAndSetSuggestions(allPokemonList, name);
      } catch (error) {
        console.error("Error fetching Pokémon suggestions:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filterAndSetSuggestions = (
    pokemonList: PokemonListItem[],
    name: string
  ) => {
    const filteredPokemons = pokemonList
      .filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(name.toLowerCase())
      )
      .slice(0, 10);
    setSuggestions(filteredPokemons);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      handleSearch(value);
    } else {
      setSuggestions([]);
    }
  };

  const getPokemonIdFromUrl = (url: string): number => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
          {suggestions.map((pokemon) => {
            const pokemonId = getPokemonIdFromUrl(pokemon.url);
            return (
              <li
                key={pokemonId}
                className="p-2 hover:bg-gray-100 flex items-center"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={pokemon.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <Link to={`/pokemon/${pokemonId}`} className="capitalize">
                  {pokemon.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {loading && (
        <div className="absolute left-0 right-0 mt-1 text-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default PokemonSearchBar;
