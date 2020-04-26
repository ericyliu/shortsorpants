import React, { useState, useEffect } from 'react';
import { getLocation } from './services/location';
import { getWeather } from './services/weather';

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
        </div>
      )}
    </div>
  );
};
