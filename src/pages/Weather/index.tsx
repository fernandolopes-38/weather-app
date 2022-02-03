import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { ForecastDay, WeatherData } from '../../types';
import styles from './styles.module.scss';

import mockedData from '../../mock.json';
import { ConditionIcon } from '../../components/ConditionIcon';
import {
  WiCelsius,
  WiDirectionDown,
  WiDirectionLeft,
  WiDirectionUp,
} from 'react-icons/wi';
import { FooterInfo } from '../../components/FooterInfo';
import { convertKmhToMs } from '../../utils/helpers';
import { Loader } from '../../components/Loader';
import { ForecastTemperature } from '../../components/ForecastTemperature';

interface WeatherProps {}

export const Weather: React.FC<WeatherProps> = ({}) => {
  const [weather, setWeather] = useState<WeatherData>();
  const [theme, setTheme] = useState('default');
  const params = useParams();
  // console.log('params', params);

  // const navigate = useNavigate();

  const { city } = params;
  // console.log('ci  ty', city);
  // if (!city) {
  //   navigate('/error');
  // }

  const setLayoutTheme = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        setTheme('sunny');
        break;
      case 'partly cloudy':
      case 'light rain':
      case 'patchy rain possible':
        setTheme('snowy');
        break;
      default:
        setTheme('default');
    }
  };

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const res = await api.get<WeatherData>(`/forecast.json?q=${city}`);
        // console.log(res);
        setWeather(res.data);
        setLayoutTheme(res.data.current.condition.text);
      } catch (error) {
        console.log(error);
      }
    };
    if (city) fetchCityWeather();
  }, [city]);

  if (!weather) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`
        ${styles.container}
        ${styles[theme]}
      `}
    >
      {/* {console.log('theme', theme)} */}
      <Link to="/">
        <WiDirectionLeft
          size={46}
          color={theme === 'sunny' ? '#fff' : '#000'}
        />
      </Link>
      <header>
        <h1>{city}</h1>
        <h2>{weather?.current.condition.text}</h2>
      </header>

      <main>
        {/* <img src={weather.current.condition.icon} /> */}

        <div>
          <div>
            <span>{weather.current.temp_c}</span>
          </div>

          <div>
            <WiCelsius fontSize={32} />
            <div>
              <WiDirectionUp size={16} />
              <p>{weather.forecast.forecastday[0].day.maxtemp_c}</p>
            </div>
            <div>
              <WiDirectionDown fontSize={20} />
              <p>{weather.forecast.forecastday[0].day.mintemp_c}</p>
            </div>
          </div>
        </div>

        <ConditionIcon theme={theme} />

        <ForecastTemperature
          forecastHours={weather.forecast.forecastday[0].hour}
        />
      </main>

      <FooterInfo
        footerItems={[
          {
            label: 'wind speed',
            value: convertKmhToMs(weather.current.wind_kph),
          },
          {
            label: 'sunrise',
            value: weather.forecast.forecastday[0].astro.sunrise,
          },
          {
            label: 'sunset',
            value: weather.forecast.forecastday[0].astro.sunset,
          },
          {
            label: 'humidity',
            value: `${String(weather.current.humidity)}%`,
          },
        ]}
      />
    </div>
  );
};
