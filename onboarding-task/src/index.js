import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import { App } from './App.jsx';
import { rootReducer } from './reducers/reducer';
import { initialState } from './constants/initialState';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const logger = createLogger();
const store = createStore(rootReducer, initialState, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
