import React from 'react';
import styles from './styles.module.scss';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

interface MainTemperatureProps {
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  theme: string;
}

export const MainTemperature: React.FC<MainTemperatureProps> = ({
  currentTemp,
  maxTemp,
  minTemp,
  theme,
}) => {
  return (
    <div
      className={`
        ${styles.container}
        ${styles[theme]}
      `}
    >
      <span
        className={styles.currentTemperature}
        data-testid="currentTemperature"
      >
        {currentTemp.toFixed(0)}
      </span>

      <div className={styles.column}>
        <span>C</span>
        <div className={styles.row}>
          <FaLongArrowAltUp
            color={
              theme === 'snowy' || theme === 'cloudy' ? '#6D6D6D' : '#B7E7EE'
            }
          />
          <p className={styles.subtext} data-testid="maxTemperature">{maxTemp.toFixed(0)}</p>
        </div>
        <div className={styles.row}>
          <FaLongArrowAltDown
            color={
              theme === 'snowy' || theme === 'cloudy' ? '#6D6D6D' : '#B7E7EE'
            }
          />
          <p className={styles.subtext} data-testid="minTemperature">{minTemp.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
};
