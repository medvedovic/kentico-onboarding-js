import { combineReducers } from 'redux';
import { settings } from './list/settings';

export const app = combineReducers({
  list: settings,
});
