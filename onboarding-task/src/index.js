import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { App } from './containers/App.tsx';
import { rootReducer } from './reducers/rootReducer.ts';
import { initialState } from './constants/initialState.ts';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
