import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pokemons } from "../api/index";

interface Pokemon {
  name: string;
  url: string; // URL contains the Pokémon's ID
}

const PokemonSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Pokémon by name and limit the suggestions to 10
  const handleSearch = async (name: string) => {
    setLoading(true);
    try {
      const response = await pokemons.getList(0, 1000); // Fetch up to 1000 Pokémon
      const filteredPokemons = response.data.results
        .filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().startsWith(name.toLowerCase())
        )
        .slice(0, 10); // Limit suggestions to 10
      setSuggestions(filteredPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and trigger search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      handleSearch(value);
    } else {
      setSuggestions([]);
    }
  };

  // Extract Pokémon ID from the URL
  const getPokemonIdFromUrl = (url: string): number => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]); // The ID is the second last part of the URL
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
            const pokemonId = getPokemonIdFromUrl(pokemon.url); // Extract ID from URL
            return (
              <li
                key={pokemonId}
                className="p-2 hover:bg-gray-100 flex items-center"
              >
                {/* Display Pokémon sprite using the correct ID */}
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
