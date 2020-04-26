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
        <ErrorContainer>
          <Error>{errorMessage(error)}</Error>
          <Input
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <Submit
            onClick={() => submitLocation(location, setWeather, setError)}
          >
            Submit
          </Submit>
        </ErrorContainer>
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

const errorMessage = (error) => {
  if (error.message === 'Timeout expired')
    return 'Looks like there was an error getting your location. Please turn on location services and refresh this page or enter your location below:';
  return 'Woops! Looks like something went wrong. Please enter a location below:';
};

const submitLocation = async (location, setWeather, setError) => {
  if (!location) return;
  setError(undefined);
  setWeather(await getWeather(location));
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

const ErrorContainer = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  color: ${colors.error};
  font-size: 18px;
  text-align: center;
  line-height: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 15px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Submit = styled.button`
  font-size 16px;
  margin: 15px auto;
  padding: 7px 30px;
  cursor: pointer;
  background-color: ${colors.background};
  border: 1px solid ${colors.text};
  transition: color .3s, border-color .3s;

  &:hover {
    border-color: white;
    color: white;
  }
`;
