import { combineReducers } from 'redux';
import { isLoading } from './isLoading';
import { fetchHasFailed } from './fetchHasFailed';

export const list = combineReducers({
  isLoading,
  fetchHasFailed,
});
