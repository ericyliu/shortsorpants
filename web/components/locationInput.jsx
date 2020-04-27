import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../utils/style';

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
