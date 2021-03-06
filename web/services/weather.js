import { get } from 'axios';
import { openWeatherUrl, openWeatherAPIKey } from '../../config';

const url = `${openWeatherUrl}?appid=${openWeatherAPIKey}&units=imperial`;

export const getWeather = async (location) => {
  const formedUrl =
    typeof location === 'object'
      ? `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      : `${url}&q=${location}`;
  const response = await get(formedUrl);
  return weatherMapper(response.data);
};

const weatherMapper = (json) => {
  return {
    city: json.name,
    tempMin: Math.round(json.main.temp_min),
    tempMax: Math.round(json.main.temp_max),
    rain: json.rain ? json.rain['1h'] > 0 : false,
  };
};
