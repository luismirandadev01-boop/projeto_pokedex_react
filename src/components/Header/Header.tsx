import React from 'react';
import PokedexLogo from '../../assets/logopokedex01.png';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
        <img src={PokedexLogo} alt={title} className={styles.logo} /> 
    </header>
  );
};

export default Header;