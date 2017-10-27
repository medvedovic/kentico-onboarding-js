import { combineReducers } from 'redux';
import { showLoader } from './showLoader';
import { fetchHasFailed } from './fetchHasFailed';

export const list = combineReducers({
  showLoader,
  fetchHasFailed
});
