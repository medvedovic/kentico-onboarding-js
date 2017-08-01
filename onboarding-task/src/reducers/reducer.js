import { combineReducers } from 'redux';
import { items as itemReducer } from './items/items';
import { flags } from './flags/flags';

const items = combineReducers({
  byIds: itemReducer,
  flags,
});

export const rootReducer = combineReducers({
  items,
});
