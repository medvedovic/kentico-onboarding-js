import { createItemBuilder } from './actionCreators';
import { itemFactory } from '../utils/itemFactory';
import {
  fetchHasSucceededBuilder,
  fetchIsLoading
} from './fetchActions';

export const createItem = createItemBuilder(itemFactory);

export {
  updateItem,
  deleteItem,
  toggleBeingEdited
} from './userActions';

export {
  fetchData,
  postData,
  repostData,
  putData,
  deleteData
} from './actionCreators';

export const fetchStartLoading = () => fetchIsLoading(true);
export const fetchStopLoading = () => fetchIsLoading(false);
export const fetchHasSucceeded = fetchHasSucceededBuilder(itemFactory);
