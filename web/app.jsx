import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import ShortsOrPants from './components/shortsOrPants';
import { getLocation } from './services/location';
import { getWeather } from './services/weather';
import styled from 'styled-components';
import { colors } from './utils/style';

export default () => {
  const [location, setLocation] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    (async () => {
      try {
        const longLat = await getLocation();
        setWeather(await getWeather(longLat));
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);
  return (
    <Container>
      <Header>Shorts or Pants</Header>
      {error && (
        <Error
          error={error}
          location={location}
          setWeather={setWeather}
          setError={setError}
          setLocation={setLocation}
        />
      )}
      {!weather && !error && (
        <h2>Hold tight as we fetch the weather for you...</h2>
      )}
      {weather && (
        <div>
          <Weather weather={weather} />
          <ShortsOrPants weather={weather} />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.background};
  padding: 30px 15px;
  color: ${colors.text};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.h1`
  position: absolute;
  top: 15px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
