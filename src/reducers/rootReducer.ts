import { combineReducers } from 'redux';

import { items } from './items/items';

import { Store } from './stores';
import { app } from './app/app';

export const rootReducer = combineReducers<Store.IRoot>({
  items,
  app,
});
