import React from 'react';
import styled from 'styled-components';

export default ({ weather }) => (
  <Container>
    <Title>
      Today's Weather in <City>{weather.city}</City>
    </Title>
    <Weather>
      {weather.tempMin}° - {weather.tempMax}°
      <Rain>{weather.rain ? '(with rain)' : ''}</Rain>
    </Weather>
  </Container>
);

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1em;
`;

const City = styled.span`
  font-size: 1.3em;
`;

const Weather = styled.h3`
  font-size: 3em;
  position: relative;
`;

const Rain = styled.p`
  font-size: 0.4em;
  position: absolute;
  top: -2em;
  right: -2em;
`;
