import React from 'react';
import styles from './styles.module.scss';

interface FooterInfoProps {
  footerItems: {
    label: string;
    value: string;
  }[];
}

export const FooterInfo: React.FC<FooterInfoProps> = ({ footerItems }) => {
  return (
    <footer className={styles.container}>
      {footerItems.map((item) => (
        <div key={item.value}>
          <p>{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </footer>
  );
};
