import axios from "axios";
import { PokemonListResponse, PokemonDetails } from "../types";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

/**
 * Fetch the list of pokemons from API
 * @param offset how many records to skip
 * @param limit how many records to return
 * @returns list of pokemons
 *
 * @url https://pokeapi.co/docs/v2#resource-listspagination-section
 */
// Fetch the list of Pokémon from the API
export const getList = async (
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(
    `/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data;
};
/**
 * Fetch a single pokemon from API
 * @param id id or name of the pokemon
 * @returns pokemon
 *
 * @url https://pokeapi.co/docs/v2#pokemon
 */
// Fetch a single Pokémon by ID or name
export const getOne = async (id: string | number): Promise<PokemonDetails> => {
  const response = await api.get<PokemonDetails>(`/pokemon/${id}`);
  return response.data;
};
