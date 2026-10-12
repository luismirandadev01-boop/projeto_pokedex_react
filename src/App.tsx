import { usePokemon } from './hooks/usePokemon';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonModal from './components/PokemonModal';
import styles from './App.module.css';

function App() {
  const {
    pokemons,
    total,
    hasMore,
    loading,
    loadingMore,
    error,
    loadMoreError,
    selectedPokemon,
    handleSearch,
    handleLoadMore,
    handleSelectPokemon,
    handleCloseModal,
  } = usePokemon();

  return (
    <div className={styles.app}>
      <Header title="Pokédex" />
      <SearchBar onSearch={handleSearch} />

      <main className={styles.main}>
        <PokemonList
          pokemons={pokemons}
          onPokemonClick={handleSelectPokemon}
          loading={loading}
          error={error}
          total={total}
          hasMore={hasMore}
          loadingMore={loadingMore}
          loadMoreError={loadMoreError}
          onLoadMore={handleLoadMore}
        />
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
