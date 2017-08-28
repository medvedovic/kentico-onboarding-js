import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { App } from './App.tsx';
import { rootReducer } from './reducers/reducer.ts';
import { initialState } from './constants/initialState.ts';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
