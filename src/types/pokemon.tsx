export interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  base_experience: number;
}

export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
}

export interface PokemonType {
  type: string;
  color: string;
}
