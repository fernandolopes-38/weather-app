import React, { useEffect } from 'react';
import { HourData } from '../../types';
import styles from './styles.module.scss';

interface ForecastTemperatureProps {
  forecastHours: HourData[];
}

export const ForecastTemperature: React.FC<ForecastTemperatureProps> = ({
  forecastHours,
}) => {
  let times = {
    dawn: { temps: 0 },
    morning: { temps: 0 },
    afternoon: { temps: 0 },
    night: { temps: 0 },
  };
  useEffect(() => {
    forecastHours.forEach((forecast) => {
      const hour = new Date(forecast.time).getHours();

      console.log(hour);
      if (hour >= 3 && hour < 9) {
        times.dawn.temps += forecast.temp_c;
      } else if (hour >= 9 && hour < 15) {
        times.morning.temps += forecast.temp_c;
      } else if (hour >= 15 && hour < 21) {
        times.afternoon.temps += forecast.temp_c;
      } else {
        times.night.temps += forecast.temp_c;
      }
    });

    console.log('times', times);
  }, [forecastHours]);

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <p>dawn</p>
        <p>{times.dawn.temps / 6}</p>
      </div>
      <div className={styles.column}>
        <p>morning</p>
        <p>{times.dawn.temps / 6}</p>
      </div>
      <div className={styles.column}>
        <p>afternoon</p>
        <p>{times.dawn.temps / 6}</p>
      </div>
      <div className={styles.column}>
        <p>night</p>
        <p>{times.dawn.temps / 6}</p>
      </div>
    </div>
  );
};
