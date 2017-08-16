import React from 'react';
import ReactDOM from 'react-dom';
import createConnection from './socket';
//import App from './components/App';

require('./style.css');
createConnection(3000);

ReactDOM.render(
  <div className="connectionState"></div>,
  document.querySelector('body')
);
