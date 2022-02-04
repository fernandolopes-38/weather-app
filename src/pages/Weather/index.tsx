import React, { useEffect, useState } from 'react';
import { WiDirectionLeft } from 'react-icons/wi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ConditionIcon } from '../../components/ConditionIcon';
import { FooterInfo } from '../../components/FooterInfo';
import { ForecastTemperature } from '../../components/ForecastTemperature';
import { Loader } from '../../components/Loader';
import { MainTemperature } from '../../components/MainTemperature';
import { getWeatherByCity } from '../../services/api';
import { WeatherData } from '../../types';
import { convertKmhToMs } from '../../utils/helpers';
import styles from './styles.module.scss';

interface WeatherProps {}

export const Weather: React.FC<WeatherProps> = ({}) => {
  const [weather, setWeather] = useState<WeatherData>();
  const [theme, setTheme] = useState('default');

  const params = useParams();
  const { city } = params;

  const navigate = useNavigate();

  const setLayoutTheme = (condition: string) => {
    if (
      condition.includes('cloudy') ||
      condition.includes('overcast') ||
      condition.includes('fog') ||
      condition.includes('mist')
    )
      setTheme('cloudy');
    else if (
      condition.includes('snow') ||
      condition.includes('sleet') ||
      condition.includes('blizzard') ||
      condition.includes('ice')
    )
      setTheme('snowy');
    else if (condition.includes('rain') || condition.includes('drizzle'))
      setTheme('rainy');
    else setTheme('sunny');
  };

  useEffect(() => {
    const fetchCityWeather = async () => {
      if (city) {
        try {
          const res = await getWeatherByCity(city);
          setWeather(res);
          setLayoutTheme(res.current.condition.text.toLowerCase());
        } catch (error) {
          navigate('/error');
        }
      }
    };

    fetchCityWeather();
  }, [city]);

  if (!weather) {
    return (
      <div className={styles.loadingContainer}>
        <Loader color="#ffffff" />
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
      <Link to="/" className={styles.backLink}>
        <WiDirectionLeft
          size={46}
          color={
            theme === 'snowy' || theme === 'cloudy' ? '#000000' : '#ffffff'
          }
        />
      </Link>

      <div className={styles.content}>
        <header>
          <h1 className={styles.text__primary}>{city}</h1>
          <h2 className={styles.text__primary}>
            {weather?.current.condition.text}
          </h2>
        </header>

        <main>
          <MainTemperature
            currentTemp={weather.current.temp_c}
            maxTemp={weather.forecast.forecastday[0].day.maxtemp_c}
            minTemp={weather.forecast.forecastday[0].day.mintemp_c}
            theme={theme}
          />

          <ConditionIcon theme={theme} />

          <ForecastTemperature
            forecastHours={weather.forecast.forecastday[0].hour}
            theme={theme}
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
          theme={theme}
        />
      </div>
    </div>
  );
};
