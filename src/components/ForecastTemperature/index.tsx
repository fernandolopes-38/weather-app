import React, { useEffect, useState } from 'react';
import { HourData } from '../../types';
import styles from './styles.module.scss';

interface ForecastTemperatureProps {
  forecastHours: HourData[];
}

type Forecast = {
  [time: string]: {
    totalTemp: number;
    conditions: {
      [time: string]: number;
      
    } 
  }
}

export const ForecastTemperature: React.FC<ForecastTemperatureProps> = ({
  forecastHours,
}) => {
  const [forecasObject, setForecasObject] = useState( {
    dawn: { temperature: "", condition: "" },
    morning: { temperature: "", condition: "" },
    afternoon: { temperature: "", condition: "" },
    night: { temperature: "", condition: "" },
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
      const condition = forecast.condition.text;
      if (hour >= 3 && hour < 9) {
        times.dawn.totalTemp += forecast.temp_c;
        times.dawn.conditions[condition] = (times.dawn.conditions[condition] || 0) + 1;
      } else if (hour >= 9 && hour < 15) {
        times.morning.totalTemp += forecast.temp_c;
        times.morning.conditions[condition] = (times.morning.conditions[condition] || 0) + 1;
      } else if (hour >= 15 && hour < 21) {
        times.afternoon.totalTemp += forecast.temp_c;
        times.afternoon.conditions[condition] = (times.afternoon.conditions[condition] || 0) + 1;
      } else {
        times.night.totalTemp += forecast.temp_c;
        times.night.conditions[condition] = (times.night.conditions[condition] || 0) + 1;
      }
    });

    setForecasObject({
      dawn: {
        temperature: (times.dawn.totalTemp/6).toFixed(0),
        condition: Object.keys(times.dawn.conditions).reduce((a, b) => times.dawn.conditions[a] > times.dawn.conditions[b] ? a : b)
      },
      morning: {
        temperature: (times.morning.totalTemp/6).toFixed(0),
        condition: Object.keys(times.morning.conditions).reduce((a, b) => times.morning.conditions[a] > times.morning.conditions[b] ? a : b)
      },
      afternoon: {
        temperature: (times.afternoon.totalTemp/6).toFixed(0),
        condition: Object.keys(times.afternoon.conditions).reduce((a, b) => times.afternoon.conditions[a] > times.afternoon.conditions[b] ? a : b)
      },
      night: {
        temperature: (times.night.totalTemp/6).toFixed(0),
        condition: Object.keys(times.night.conditions).reduce((a, b) => times.night.conditions[a] > times.night.conditions[b] ? a : b)
      }
    })
  }, [forecastHours]);

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <p>dawn</p>
        {/* <p>{forecasObject.dawn.condition}</p> */}
        <p>{forecasObject.dawn.temperature}</p>
      </div>
      <div className={styles.column}>
        <p>morning</p>
        {/* <p>{forecasObject.morning.condition}</p> */}
        <p>{forecasObject.morning.temperature}</p>
      </div>
      <div className={styles.column}>
        <p>afternoon</p>
        {/* <p>{forecasObject.afternoon.condition}</p> */}
        <p>{forecasObject.afternoon.temperature}</p>
      </div>
      <div className={styles.column}>
        <p>night</p>
        {/* <p>{forecasObject.night.condition}</p> */}
        <p>{forecasObject.night.temperature}</p>
      </div>
    </div>
  );
};
