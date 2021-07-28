import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
