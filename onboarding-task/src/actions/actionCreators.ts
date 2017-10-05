import {
  LocalItemActions,
} from '../constants/actionTypes';
import {
  IItemFactoryWithGenerator,
  itemFactory
} from '../utils/itemFactory';

import { IAction } from './IAction';
import {
  fetchHasFailed,
  fetchHasSucceededBuilder,
  fetchIsLoading
} from './fetchActions';
import {
  repostItemDataActionFactory,
  postItemDataActionFactory,
  postError,
  postSuccess
} from './postDataActionFactory';
import { fetchDataActionFactory } from './fetchDataActionFactory';
import {
  putDataActionFactory,
  putError,
  putSuccess
} from './putDataActionFactory';
import {
  deleteDataActionFactory,
  deleteError
} from './deleteDataActionFactory';
import {
  deleteItem,
  updateItem
} from './userActions';
import {
  deleteAction,
  postAction,
  putAction
} from './httpActionBuilder';
import { apiEndpoint } from '../constants/AppSettings';

const fetch = require('isomorphic-fetch');

export const fetchStartLoading = fetchIsLoading(true);
export const fetchStopLoading = fetchIsLoading(false);
export const fetchHasSucceeded = fetchHasSucceededBuilder(itemFactory);

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: LocalItemActions.CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const createItem = createItemBuilder(itemFactory);

export const postData = postItemDataActionFactory({
  postOperation: postAction,
  onPostSuccess: postSuccess,
  onPostError: postError,
  createItemOperation: createItem,
  apiEndpoint
});

export const repostData = repostItemDataActionFactory({
  postOperation: postAction,
  onPostSuccess: postSuccess,
  onPostError: postError,
  apiEndpoint
});

export const fetchData = fetchDataActionFactory({
  fetchOperation: fetch,
  startLoader: fetchStartLoading,
  stopLoader: fetchStopLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint
});

export const putData = putDataActionFactory({
  putOperation: putAction,
  onPutSuccess: putSuccess,
  onPutError: putError,
  updateItemOperation: updateItem,
  apiEndpoint
});

export const deleteData = deleteDataActionFactory({
  deleteOperation: deleteAction,
  onDeleteError: deleteError,
  onDeleteSuccess: deleteItem,
  apiEndpoint
});
