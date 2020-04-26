import React, { useState, useEffect } from 'react';
import { getLocation } from './services/location';
import { getWeather } from './services/weather';

const shortsPants = {
  shorts: 'Shorts',
  pants: 'Pants',
};

export default () => {
  const [location, setLocation] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  useEffect(() => {
    (async () => {
      try {
        const location = await getLocation();
        setWeather(await getWeather(location));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location]);
  return (
    <div>
      <h1>Shorts or Pants</h1>
      {weather && (
        <div>
          <h2>Today's Weather in {weather.city}</h2>
          <p>
            {weather.tempMin}° - {weather.tempMax}°
            {weather.rain ? ', with Rain' : ''}
          </p>
          <h2>We recommend you wear:</h2>
          <p>{shortsOrPants(weather)}</p>
        </div>
      )}
    </div>
  );
};

const shortsOrPants = (weather) => {
  if (weather.tempMin < 60) return shortsPants.pants;
  if (weather.rain) return shortsPants.pants;
  if (weather.tempMax > 75) return shortsPants.shorts;
  if ((weather.tempMax + weather.tempMin) / 2 < 65) return shortsPants.pants;
  return shortsPants.shorts;
};
