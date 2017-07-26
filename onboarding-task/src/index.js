import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { OrderedMap } from 'immutable';
import { createLogger } from 'redux-logger';

import { App } from './App.jsx';
import { reducer } from './reducers/reducers';
import { ListItemModel } from './model/ListItemModel';
import { generateGuid } from './utils/generateGuid';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const logger = createLogger();
const initialState = {
  items: new OrderedMap([
    [generateGuid(), new ListItemModel({ value: 'Make coffee' })],
    [generateGuid(), new ListItemModel({ value: 'Master React' })],
  ]),
};

const store = createStore(reducer, initialState, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
