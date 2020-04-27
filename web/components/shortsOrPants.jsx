import React from 'react';
import styled from 'styled-components';

export default ({ weather }) => (
  <Container>
    <Title>We recommend you wear:</Title>
    <ShortsOrPants>{shortsOrPants(weather)}</ShortsOrPants>
  </Container>
);

const shortsPants = {
  shorts: 'Shorts',
  pants: 'Pants',
};

const shortsOrPants = (weather) => {
  if (weather.tempMin < 60) return shortsPants.pants;
  if (weather.rain) return shortsPants.pants;
  if (weather.tempMax > 75) return shortsPants.shorts;
  if ((weather.tempMax + weather.tempMin) / 2 < 65) return shortsPants.pants;
  return shortsPants.shorts;
};

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1em;
`;

const ShortsOrPants = styled.p`
  font-size: 4em;
  text-transform: uppercase;
  margin-top: 15px;
`;
