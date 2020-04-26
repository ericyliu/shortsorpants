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
      setError(undefined);
      try {
        setLocation(await getLocation());
      } catch (error) {
        setError(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (location === undefined) return;
      setWeather(await getWeather(location));
    })();
  }, [location]);
  return (
    <Container>
      <Header>Shorts or Pants</Header>
      {error && (
        <Error>
          Looks like there was an error getting your location. Please turn on
          location services and refresh this page.
        </Error>
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
`;

const Header = styled.h1`
  position: absolute;
  top: 15px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Error = styled.p`
  color: ${colors.error};
  font-size: 18px;
  max-width: 400px;
  text-align: center;
  line-height: 24px;
`;
