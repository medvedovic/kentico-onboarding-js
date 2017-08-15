import { combineReducers } from 'redux';

import { items } from './items/items';

import { Store } from '../interfaces';

export const rootReducer = combineReducers<Store.IRoot>({
  items,
});
