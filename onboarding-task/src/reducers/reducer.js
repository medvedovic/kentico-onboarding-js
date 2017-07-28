import { combineReducers } from 'redux';
import { items } from './itemsReducer';
import { itemsBeingEdited } from './itemsBeingEdited';

export const rootReducer = combineReducers({
  items,
  itemsBeingEdited,
});
