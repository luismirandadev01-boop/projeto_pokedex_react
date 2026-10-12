import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import { pokemonColors } from '../../utils/colors';
import { formatPokemonId, capitalizeFirstLetter } from '../../utils/helpers';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const backgroundColor = pokemonColors[mainType] || pokemonColors.normal;
  const image =
    pokemon.sprites.front_default ||
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    undefined;

  return (
    <div 
      className={styles.card} 
      style={{ backgroundColor }}
      onClick={() => onClick(pokemon)}
    >
      <div className={styles.imgContainer}>
        <img 
          src={image} 
          alt={pokemon.name}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <span className={styles.number}>#{formatPokemonId(pokemon.id)}</span>
        <h3 className={styles.name}>{capitalizeFirstLetter(pokemon.name)}</h3>
        <div className={styles.types}>
          {pokemon.types.map((typeInfo, index) => (
            <span key={index} className={styles.type}>
              {capitalizeFirstLetter(typeInfo.type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
