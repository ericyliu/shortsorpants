import axios from 'axios';
import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/app';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('when the app starts', () => {
  let rendered;

  beforeEach(async () => {
    const promise = Promise.resolve(); //https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    global.navigator.geolocation.getCurrentPosition = (resolve) =>
      resolve(testLocationData);
    axios.get.mockResolvedValue({ data: testWeatherData });
    act(() => {
      rendered = render(<App />);
    });
    await act(() => promise);
  });

  it('displays the title', () => {
    rendered.getByText('Shorts or Pants');
  });

  it('displays the current weather', () => {
    rendered.getByText('San Diego', { exact: false });
    rendered.getByText('60° - 70°, with Rain');
  });

  it('tells you to wear shorts', () => {
    rendered.getByText('Pants');
  });
});

const testLocationData = {
  coords: { latitude: 0, longitude: 0 },
};

const testWeatherData = {
  name: 'San Diego',
  main: {
    temp_min: 60,
    temp_max: 70,
  },
  rain: {
    '1h': 0.25,
  },
};
