import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import ShortsOrPants from './components/shortsOrPants';
import Error from './components/error';
import LocationInput from './components/locationInput';
import { getLocation } from './services/location';
import { getWeather } from './services/weather';
import styled from 'styled-components';
import { colors } from './utils/style';

export default () => {
  const [locationInput, setLocationInput] = useState(false);
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
  const submitLocation = async (location) => {
    if (!location) return;
    setError(undefined);
    setLocationInput(false);
    setWeather(await getWeather(location));
  };
  return (
    <Container>
      <HeaderContainer>
        <Header>Shorts or Pants</Header>
        <InputLocation
          onClick={() => {
            setWeather(undefined);
            setError(undefined);
            setLocationInput(true);
          }}
        >
          Choose New Location
        </InputLocation>
      </HeaderContainer>
      {locationInput && <LocationInput submitLocation={submitLocation} />}
      {error && <Error error={error} submitLocation={submitLocation} />}
      {!weather && !error && !locationInput && (
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

const HeaderContainer = styled.div`
  position: absolute;
  top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InputLocation = styled.a`
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;
