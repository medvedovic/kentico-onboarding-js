import { combineReducers } from 'redux';

import { data } from './data/data';
import { flags } from './flags/flags';
import { ids } from './ids';

import { Reducer } from '../../interfaces';

export const items = combineReducers<Reducer.Items>({
  ids,
  data,
  flags,
});
