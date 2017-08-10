import { combineReducers } from 'redux';

import { items } from './items/items';

import { Reducer } from '../interfaces';

export const rootReducer = combineReducers<Reducer.Root>({
  items,
});
