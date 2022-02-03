import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

interface LinksGridProps {
  children: ReactNode;
}

export const LinksGrid: React.FC<LinksGridProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
