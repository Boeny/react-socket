import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import provider from './dataProvider';

require('./style.css');

global.onload = () => {
  ReactDOM.render(
    <App onUpdate={provider.default} />,
    document.getElementById('app')
  );
};
