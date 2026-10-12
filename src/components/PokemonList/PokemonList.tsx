import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import PokemonCard from '../PokemonCard';
import styles from './PokemonList.module.css';

interface PokemonListProps {
  pokemons: Pokemon[];
  onPokemonClick: (pokemon: Pokemon) => void;
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  loadingMore: boolean;
  loadMoreError: string | null;
  onLoadMore: () => void;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  onPokemonClick,
  loading,
  error,
  total,
  hasMore,
  loadingMore,
  loadMoreError,
  onLoadMore
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <h2 className={styles.loadingMessage}>Carregando Pokedex</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.error}>Error: {error}</h2>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.notFoundMessage}>Nenhum pokémon encontrado</h2>
      </div>
    );
  }

  return (
    <>
      <div className={styles.list}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={onPokemonClick}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <p className={styles.counter}>
          Mostrando {pokemons.length} de {total} pokémon
        </p>

        {loadMoreError && <p className={styles.loadMoreError}>{loadMoreError}</p>}

        {hasMore && (
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Carregando...' : loadMoreError ? 'Tentar novamente' : 'Carregar mais'}
          </button>
        )}
      </div>
    </>
  );
};

export default PokemonList;
