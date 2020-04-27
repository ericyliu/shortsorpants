import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../utils/style';

export default ({ submitLocation }) => {
  const [location, setLocation] = useState(undefined);
  return (
    <Container>
      <Input
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <Submit onClick={() => submitLocation(location)}>Submit</Submit>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.mobile}px) {
    max-width: 80%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1em 2em;
  font-size: 1em;
  box-sizing: border-box;
`;

const Submit = styled.button`
  font-size 1em;
  margin: 1em auto;
  padding: 1em 3em;
  cursor: pointer;
  background-color: ${colors.background};
  border: 1px solid ${colors.text};
  transition: color .3s, border-color .3s;

  &:hover {
    border-color: white;
    color: white;
  }
`;
