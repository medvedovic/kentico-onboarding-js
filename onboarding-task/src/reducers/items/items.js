import { combineReducers } from 'redux';

import { data } from './data/data';
import { flags } from './flags/flags';
import { ids } from './ids';

export const items = combineReducers({
  ids,
  data,
  flags,
});
