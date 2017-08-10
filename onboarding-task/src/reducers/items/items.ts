import { combineReducers } from 'redux';

import { data } from './data/data';
import { flags } from './flags/flags';
import { ids } from './ids';

import { Store } from '../../interfaces';

export const items = combineReducers<Store.Items>({
  ids,
  data,
  flags,
});
