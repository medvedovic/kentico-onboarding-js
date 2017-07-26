import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { OrderedMap } from 'immutable';

import { ListItemModel } from '../model/ListItemModel';
import { generateGuid } from '../utils/generateGuid';

import { reducer } from '../reducers/reducers';

const logger = createLogger();
const initialState = {
  items: new OrderedMap([
    [generateGuid(), new ListItemModel({ value: 'Make coffee' })],
    [generateGuid(), new ListItemModel({ value: 'Master React' })],
  ]),
};

export const store = createStore(reducer, initialState, applyMiddleware(logger));
