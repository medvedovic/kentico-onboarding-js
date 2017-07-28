import { combineReducers } from 'redux';
import { items } from './itemsReducer';

export const rootReducer = combineReducers({
  items,
});
