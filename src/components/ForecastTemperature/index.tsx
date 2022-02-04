import React, { useEffect, useState } from 'react';
import { HourData } from '../../types';
import styles from './styles.module.scss';

interface ForecastTemperatureProps {
  forecastHours: HourData[];
  theme: string;
}

type Forecast = {
  [time: string]: {
    totalTemp: number;
    conditions: {
      [time: string]: number;
    };
  };
};

export const ForecastTemperature: React.FC<ForecastTemperatureProps> = ({
  forecastHours,
  theme,
}) => {
  const [forecasObject, setForecasObject] = useState({
    dawn: { temperature: '', condition: '' },
    morning: { temperature: '', condition: '' },
    afternoon: { temperature: '', condition: '' },
    night: { temperature: '', condition: '' },
  });
  const times: Forecast = {
    dawn: { totalTemp: 0, conditions: {} },
    morning: { totalTemp: 0, conditions: {} },
    afternoon: { totalTemp: 0, conditions: {} },
    night: { totalTemp: 0, conditions: {} },
  };
  useEffect(() => {
    forecastHours.forEach((forecast) => {
      const hour = new Date(forecast.time).getHours();
      const condition = forecast.condition.icon;
      console.log('forecast.condition', forecast.condition);
      if (hour >= 3 && hour < 9) {
        times.dawn.totalTemp += forecast.temp_c;
        times.dawn.conditions[condition] =
          (times.dawn.conditions[condition] || 0) + 1;
      } else if (hour >= 9 && hour < 15) {
        times.morning.totalTemp += forecast.temp_c;
        times.morning.conditions[condition] =
          (times.morning.conditions[condition] || 0) + 1;
      } else if (hour >= 15 && hour < 21) {
        times.afternoon.totalTemp += forecast.temp_c;
        times.afternoon.conditions[condition] =
          (times.afternoon.conditions[condition] || 0) + 1;
      } else {
        times.night.totalTemp += forecast.temp_c;
        times.night.conditions[condition] =
          (times.night.conditions[condition] || 0) + 1;
      }
    });

    setForecasObject({
      dawn: {
        temperature: (times.dawn.totalTemp / 6).toFixed(0),
        condition: Object.keys(times.dawn.conditions).reduce((a, b) =>
          times.dawn.conditions[a] > times.dawn.conditions[b] ? a : b
        ),
      },
      morning: {
        temperature: (times.morning.totalTemp / 6).toFixed(0),
        condition: Object.keys(times.morning.conditions).reduce((a, b) =>
          times.morning.conditions[a] > times.morning.conditions[b] ? a : b
        ),
      },
      afternoon: {
        temperature: (times.afternoon.totalTemp / 6).toFixed(0),
        condition: Object.keys(times.afternoon.conditions).reduce((a, b) =>
          times.afternoon.conditions[a] > times.afternoon.conditions[b] ? a : b
        ),
      },
      night: {
        temperature: (times.night.totalTemp / 6).toFixed(0),
        condition: Object.keys(times.night.conditions).reduce((a, b) =>
          times.night.conditions[a] > times.night.conditions[b] ? a : b
        ),
      },
    });
  }, [forecastHours]);

  return (
    <div
      className={`
        ${styles.container}
        ${styles[theme]}
      `}
    >
      <div className={styles.column}>
        <p>dawn</p>
        <img src={forecasObject.dawn.condition} alt="weather condiction" />
        <p className={styles.temp}>
          {forecasObject.dawn.temperature} <span>C</span>
        </p>
      </div>
      <div className={styles.column}>
        <p>morning</p>
        <img src={forecasObject.morning.condition} alt="weather condiction" />
        <p className={styles.temp}>
          {forecasObject.morning.temperature} <span>C</span>
        </p>
      </div>
      <div className={styles.column}>
        <p>afternoon</p>
        <img src={forecasObject.afternoon.condition} alt="weather condiction" />
        <p className={styles.temp}>
          {forecasObject.afternoon.temperature} <span>C</span>
        </p>
      </div>
      <div className={styles.column}>
        <p>night</p>
        <img src={forecasObject.night.condition} alt="weather condiction" />
        <p className={styles.temp}>
          {forecasObject.night.temperature} <span>C</span>
        </p>
      </div>
    </div>
  );
};
