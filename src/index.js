import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/index.css';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider';
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
