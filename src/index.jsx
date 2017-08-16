import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
require('./style.css');

function getData(callback){
  io().on('state', callback);
}

global.onload = () => {
  ReactDOM.render(
    <App onUpdate={getData} />,
    document.getElementById('app')
  );
};
