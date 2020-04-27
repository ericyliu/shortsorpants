import axios from 'axios';
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import App from '../web/app';

jest.mock('axios');

describe('when the app starts', () => {
  let rendered;

  beforeEach(async () => {
    const promise = Promise.resolve(); //https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    global.navigator.geolocation.getCurrentPosition = (resolve) =>
      resolve(testLocationData);
    axios.get.mockImplementation(testWeatherData);
    act(() => {
      rendered = render(<App />);
    });
    await act(() => promise);
  });

  it('displays the title', () => {
    rendered.getByText('Shorts or Pants');
  });

  it('displays the current weather', () => {
    rendered.getByText('San Diego');
    rendered.getByText('60° - 70°');
    rendered.getByText('(with rain)');
  });

  it('tells you to wear shorts', () => {
    rendered.getByText('Pants');
  });

  describe('and I select a location manually', () => {
    beforeEach(async () => {
      const promise = Promise.resolve();
      fireEvent.click(rendered.getByText('Choose New Location'));
      fireEvent.change(rendered.getByPlaceholderText('Location'), {
        target: { value: 'New York' },
      });
      fireEvent.click(rendered.getByText('Submit'));
      await act(() => promise);
    });

    it("displays the given location's weather", () => {
      rendered.getByText('New York');
      rendered.getByText('40° - 50°');
      rendered.getByText('Pants');
    });
  });
});

const testLocationData = {
  coords: { latitude: 0, longitude: 0 },
};

const testWeatherData = (url) => {
  if (url.indexOf('New York') > -1) {
    return Promise.resolve({
      data: {
        name: 'New York',
        main: {
          temp_min: 40,
          temp_max: 50,
        },
      },
    });
  }
  return Promise.resolve({
    data: {
      name: 'San Diego',
      main: {
        temp_min: 60,
        temp_max: 70,
      },
      rain: {
        '1h': 0.25,
      },
    },
  });
};
