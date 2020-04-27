# Shorts or Pants

![Coverage Badge](coverage/badge-lines.svg)

A weather app telling you whether you should wear shorts or pants today.

## Setup

1. `yarn install` to install dependencies
2. make a copy of `config.sample.js` and rename it to `config.js`
3. add [OpenWeatherMap](https://openweathermap.org/) api key

## Development

1. `yarn dev` to start webpack and the node server
2. go to [localhost:3000](http://localhost:8080)

Server and webapp will reload on file change

### Extras
- `yarn test:watch` to run the jest tests on file change
- `yarn lint` to run eslint and prettier

## Deployment

1. `yarn build` to build the webapp
2. `yarn start` to start the node server
