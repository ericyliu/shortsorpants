import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/style';

export default ({ error, submitLocation }) => {
  return (
    <Container>
      <Error>{errorMessage(error)}</Error>
    </Container>
  );
};

const errorMessage = (error) => {
  if (error.message === 'Timeout expired')
    return 'Looks like there was an error getting your location. Please turn on location services and refresh this page or enter your location below.';
  return 'Woops! Looks like something went wrong. Please enter a location below.';
};

const Container = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  color: ${colors.error};
  font-size: 1.2em;
  text-align: center;
  line-height: 1.6em;
`;
