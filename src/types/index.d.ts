export type WeatherData = {
  location: LocationData;
  current: CurrentWeather;
  forecast: ForecastWeather;
};

type LocationData = {
  localtime: string;
}

type CurrentWeather = {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  condition: Condition;
};

type ForecastWeather = {
  forecastday: ForecastDay[];
};

export type ForecastDay = {
  day: DayData;
  astro: AstroData;
  hour: HourData[];
};

type DayData = {
  maxtemp_c: number;
  mintemp_c: number;
};
type AstroData = {
  sunrise: string;
  sunset: string;
};

export type HourData = {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: Condition;
};

type Condition = {
  text: string;
  icon: string;
};
