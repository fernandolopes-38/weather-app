import axios from 'axios';
import { WeatherData } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
});

export const getWeatherByCity = async (city: string) => {
  return await api
    .get<WeatherData>(`/forecast.json?q=${city}`)
    .then((res) => res.data);
};
