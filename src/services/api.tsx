import type { Pokemon, PokemonListItem } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const pokemonCache = new Map<string, Pokemon>();

const getIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
};

export const fetchPokemonIndex = async (): Promise<PokemonListItem[]> => {
  const response = await fetch(`${API_BASE_URL}?limit=100000&offset=0`);
  if (!response.ok) {
    throw new Error('Falha ao carregar a lista de Pokémon');
  }
  const data: { results: { name: string; url: string }[] } = await response.json();
  return data.results.map((item) => ({ ...item, id: getIdFromUrl(item.url) }));
};

const fetchPokemonDetails = async (item: PokemonListItem): Promise<Pokemon> => {
  const cached = pokemonCache.get(item.url);
  if (cached) {
    return cached;
  }

  const response = await fetch(item.url);
  if (!response.ok) {
    throw new Error(`Falha na busca por Pokémon ${item.name}`);
  }
  const pokemon: Pokemon = await response.json();
  pokemonCache.set(item.url, pokemon);
  return pokemon;
};

export const fetchPokemonBatch = async (items: PokemonListItem[]): Promise<Pokemon[]> => {
  if (items.length === 0) {
    return [];
  }

  const results = await Promise.allSettled(items.map(fetchPokemonDetails));
  const pokemons = results
    .filter((result): result is PromiseFulfilledResult<Pokemon> => result.status === 'fulfilled')
    .map((result) => result.value);

  if (pokemons.length === 0) {
    throw new Error('Falha na busca por Pokémon');
  }
  return pokemons;
};
