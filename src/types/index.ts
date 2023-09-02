export interface PokemonResults {
  count: number;
  next: string;
  previous?: string;
  results: SimplePokemon[];
}

export interface SimplePokemon {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  order: number;
  name: string;
  types: PokemonTypes[];
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
}

export interface PokemonTypes {
  type: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default: string;
}

export interface PokemonAbility {
  ability: {
    name: string;
    slot: number;
  };
}
