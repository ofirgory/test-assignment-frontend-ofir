import React, { useState, useEffect } from "react";
import { pokemons } from "../api/index";
import { Link } from "react-router-dom";
import PokemonSearchBar from "./PokemonSearchBar";

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const response = await pokemons.getList(offset, limit);
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Add the search bar at the top */}
      <PokemonSearchBar />

      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
          >
            <Link to={`/pokemon/${index + 1 + (page - 1) * limit}`}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1 + (page - 1) * limit
                }.png`}
                alt={pokemon.name}
                className="w-12 h-12 mx-auto mb-2" // Smaller sprite size
              />
              <div className="text-center capitalize">{pokemon.name}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
