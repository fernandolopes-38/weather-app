import React from 'react';
import { Link } from 'react-router-dom';
import { LinksGrid } from '../../components/LinksGrid';
import styles from './styles.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <h1>WEATHER</h1>
          <h2>select a city</h2>
        </header>

        <main>
          <img src="/globe.png" />

          <LinksGrid>
            <Link to="/weather/dallol">Dallol</Link>
            <Link to="/weather/fairbanks">Fairbanks</Link>
            <Link to="/weather/londres">Londres</Link>
            <Link to="/weather/recife">Recife</Link>
            <Link to="/weather/vancouver">Vancouver</Link>
            <Link to="/weather/yakutsk">Yakutsk</Link>
          </LinksGrid>
        </main>
      </div>
    </div>
  );
};
