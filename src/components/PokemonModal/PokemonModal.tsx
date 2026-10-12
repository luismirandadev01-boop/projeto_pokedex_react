import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import { pokemonColors } from '../../utils/colors';
import { formatPokemonId, capitalizeFirstLetter } from '../../utils/helpers';
import styles from './PokemonModal.module.css';

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const backgroundColor = pokemonColors[mainType] || pokemonColors.normal;


  const formatStatName = (name: string): string => {
    const statNames: Record<string, string> = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      'speed': 'Speed',
    };
    return statNames[name] || capitalizeFirstLetter(name);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        style={{ backgroundColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.modalHeader}>
          <div className={styles.imgContainer}>
            <img 
              src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || undefined} 
              alt={pokemon.name}
              className={styles.modalImage}
            />
          </div>
          <div className={styles.headerInfo}>
            <span className={styles.modalNumber}>#{formatPokemonId(pokemon.id)}</span>
            <h2 className={styles.modalName}>{capitalizeFirstLetter(pokemon.name)}</h2>
            <div className={styles.modalTypes}>
              {pokemon.types.map((typeInfo, index) => (
                <span key={index} className={styles.modalType}>
                  {capitalizeFirstLetter(typeInfo.type.name)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.statsSection}>
            <h3>Base Stats</h3>
            <div className={styles.statsGrid}>
              {pokemon.stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statName}>{formatStatName(stat.stat.name)}</span>
                  <div className={styles.statBarContainer}>
                    <div 
                      className={styles.statBar} 
                      style={{ width: `${Math.min(stat.base_stat, 150)}px` }}
                    >
                      <span className={styles.statValue}>{stat.base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Height</span>
              <span className={styles.detailValue}>{pokemon.height / 10} m</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Weight</span>
              <span className={styles.detailValue}>{pokemon.weight / 10} kg</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Base Exp</span>
              <span className={styles.detailValue}>{pokemon.base_experience}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Abilities</span>
              <div className={styles.abilities}>
                {pokemon.abilities.map((ability, index) => (
                  <span key={index} className={styles.ability}>
                    {capitalizeFirstLetter(ability.ability.name)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;