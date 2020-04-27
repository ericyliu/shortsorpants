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
  font-size: 16px;
`;

const City = styled.span`
  font-size: 20px;
`;

const Weather = styled.h3`
  font-size: 50px;
  position: relative;
`;

const Rain = styled.p`
  font-size: 16px;
  position: absolute;
  top: -20px;
  right: -50px;
`;
