import { useState, useEffect, useCallback, useRef } from 'react';
import type { Pokemon, PokemonListItem } from '../types/pokemon';
import { fetchPokemonIndex, fetchPokemonBatch } from '../services/api';

export const PAGE_SIZE = 24;

export const usePokemon = () => {

  const [allItems, setAllItems] = useState<PokemonListItem[]>([]);

  const [activeItems, setActiveItems] = useState<PokemonListItem[]>([]);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [loadedCount, setLoadedCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const requestId = useRef<number>(0);

  const showItems = useCallback(async (items: PokemonListItem[]) => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);
    setLoadMoreError(null);
    setActiveItems(items);

    try {
      const firstPage = items.slice(0, PAGE_SIZE);
      const data = await fetchPokemonBatch(firstPage);
      if (currentRequest !== requestId.current) return;
      setPokemons(data);
      setLoadedCount(firstPage.length);
    } catch (err) {
      if (currentRequest !== requestId.current) return;
      setPokemons([]);
      setLoadedCount(0);
      setError(err instanceof Error ? err.message : 'Falha na busca por Pokémon');
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const index = await fetchPokemonIndex();
        setAllItems(index);
        await showItems(index);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar a lista de Pokémon');
        setLoading(false);
      }
    };

    init();
  }, [showItems]);

  const handleSearch = (query: string) => {
    if (allItems.length === 0) return;

    const term = query.trim().toLowerCase();
    if (!term) {
      showItems(allItems);
      return;
    }

    const matches = allItems.filter(
      (item) => item.name.includes(term) || String(item.id) === term
    );
    showItems(matches);
  };

  const handleLoadMore = async () => {
    if (loading || loadingMore) return;

    const nextItems = activeItems.slice(loadedCount, loadedCount + PAGE_SIZE);
    if (nextItems.length === 0) return;

    const currentRequest = requestId.current;
    setLoadingMore(true);
    setLoadMoreError(null);

    try {
      const data = await fetchPokemonBatch(nextItems);
      if (currentRequest !== requestId.current) return;
      setPokemons((prev) => [...prev, ...data]);
      setLoadedCount((prev) => prev + nextItems.length);
    } catch {
      if (currentRequest !== requestId.current) return;
      setLoadMoreError('Não foi possível carregar mais Pokémon. Tente novamente.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return {
    pokemons,
    total: activeItems.length,
    hasMore: loadedCount < activeItems.length,
    loading,
    loadingMore,
    error,
    loadMoreError,
    selectedPokemon,
    handleSearch,
    handleLoadMore,
    handleSelectPokemon,
    handleCloseModal,
  };
};
