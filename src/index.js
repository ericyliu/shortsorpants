import React from 'react';
import ReactDOM from 'react-dom';

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<h1>Shorts or Pants</h1>, wrapper) : false;
