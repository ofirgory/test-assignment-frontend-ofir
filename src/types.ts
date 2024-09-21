//structure for Pokémon types
export interface PokemonType {
  type: {
    name: string;
  };
}

//structure for Pokémon abilities
export interface PokemonAbility {
  ability: {
    name: string;
  };
}

//structure for Pokémon stats
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

//structure for Pokémon details
export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

//structure for individual items in the Pokémon list
export interface PokemonListItem {
  name: string;
  url: string;
}

//structure for the Pokémon list response
export interface PokemonListResponse {
  results: PokemonListItem[];
}
