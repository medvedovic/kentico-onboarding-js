import { combineReducers } from 'redux';
import { items } from './itemsReducer';
import { flags } from './flagsReducer';

export const rootReducer = combineReducers({
  items,
  flags,
});
