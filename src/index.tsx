import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { store } from './modules/store/store';
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

// 1) добавить catch обработку ошибок
// 2) добавить units из проекта Валерия
// 3) попробовать перевести  все санки  на try  и cath
// 4) подправить все тесты
