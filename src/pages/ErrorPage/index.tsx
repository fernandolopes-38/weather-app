import React from 'react';
import styles from './styles.module.scss';

export const ErrorPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Error. Page not found.</h1>
    </div>
  );
};
