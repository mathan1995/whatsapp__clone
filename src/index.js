import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/index.css';
import App from './App/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
