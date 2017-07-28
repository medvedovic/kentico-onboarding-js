import { combineReducers } from 'redux';
import { items } from './itemsReducer';
import { flagsReducer } from './flagsReducer';

export const rootReducer = combineReducers({
  items,
  itemsBeingEdited: flagsReducer,
});
