import React from 'react';
import styles from './styles.module.scss';
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa"

interface MainTemperatureProps {
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
}

export const MainTemperature: React.FC<MainTemperatureProps> = ({ currentTemp, maxTemp, minTemp }) => {
  return (
    <div className={styles.container}>
      <span className={styles.currentTemperature}>{currentTemp.toFixed(0)}</span>

      <div className={styles.column}>
        <span className={styles.text__primary}>C</span>
        <div className={styles.row}>
          <FaLongArrowAltUp />
          <p>{maxTemp.toFixed(0)}</p>
        </div>
        <div className={styles.row}>
          <FaLongArrowAltDown />
          <p>{minTemp.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
};