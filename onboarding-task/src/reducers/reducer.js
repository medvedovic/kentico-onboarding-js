import { combineReducers } from 'redux';
import { items as itemReducer } from './items/items';
import { flags } from './flags/flags';
import { ids } from './ids';

const items = combineReducers({
  ids,
  byIds: itemReducer,
  flags,
});

export const rootReducer = combineReducers({
  items,
});
