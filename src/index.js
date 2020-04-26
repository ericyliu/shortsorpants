import React from 'react';
import ReactDOM from 'react-dom';

export const app = <h1>Shorts or Pants</h1>;

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(app, wrapper) : false;
