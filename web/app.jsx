import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import ShortsOrPants from './components/shortsOrPants';
import Error from './components/error';
import LocationInput from './components/locationInput';
import { getLocation } from './services/location';
import { getWeather } from './services/weather';
import styled from 'styled-components';
import { colors, breakpoints } from './utils/style';

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
        setLocationInput(true);
      }
    })();
  }, []);
  const submitLocation = async (location) => {
    if (!location) return;
    setError(undefined);
    setLocationInput(false);
    try {
      setWeather(await getWeather(location));
    } catch (error) {
      setError(error);
      setLocationInput(true);
    }
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
      {error && <Error error={error} />}
      {locationInput && <LocationInput submitLocation={submitLocation} />}
      {!weather && !error && !locationInput && (
        <Loading>Hold tight as we fetch the weather for you...</Loading>
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
  font-size: 1em;
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InputLocation = styled.a`
  font-size: 1em;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

const Loading = styled.h2`
  font-size: 1.2em;
  text-align: center;
`;
