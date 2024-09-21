import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { pokemons } from "../api/index";
import PokemonSearchBar from "./PokemonSearchBar";
import { PokemonListItem } from "../types";

const inMemoryCache: { [key: string]: PokemonListItem[] } = {};

const PokemonList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(20);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cacheKey = `pokemon_list_page_${page}`;
      const cachedPokemonList = inMemoryCache[cacheKey];

      if (cachedPokemonList) {
        console.log(`Using cached Pokémon list for page ${page}`);
        setPokemonList(cachedPokemonList);
        setLoading(false);
      } else {
        console.log(`Making API call for Pokémon list on page ${page}`);
        try {
          const offset = (page - 1) * limit;
          const response = await pokemons.getList(offset, limit);
          setPokemonList(response.results);
          inMemoryCache[cacheKey] = response.results;
        } catch (error) {
          console.error("Error fetching Pokémon list:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [page, limit]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-red-600 min-h-screen">
      <PokemonSearchBar />
      <h1 className="text-4xl font-bold text-center mb-6">Pokédex</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <li
            key={index}
            className="p-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300"
          >
            <Link
              to={`/pokemon/${index + 1 + (page - 1) * limit}`}
              state={{ fromPage: page }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1 + (page - 1) * limit
                }.png`}
                alt={pokemon.name}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-center capitalize">{pokemon.name}</div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => updatePage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
