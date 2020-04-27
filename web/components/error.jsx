import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/style';
import LocationInput from './locationInput';

export default ({ error, submitLocation }) => {
  return (
    <Container>
      <Error>{errorMessage(error)}</Error>
      <LocationInput submitLocation={submitLocation} />
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
