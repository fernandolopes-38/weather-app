import React from 'react';
import styles from './styles.module.scss';

interface FooterInfoProps {
  footerItems: {
    label: string;
    value: string;
  }[];

  theme: string;
}

export const FooterInfo: React.FC<FooterInfoProps> = ({
  footerItems,
  theme,
}) => {
  return (
    <footer
      className={`
      ${styles.container}
      ${styles[theme]}
    `}
    >
      {footerItems.map((item) => (
        <div key={item.value}>
          <p className={styles.label}>{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </footer>
  );
};
