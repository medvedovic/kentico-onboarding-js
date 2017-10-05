import {
  EHttpActionStatus,
  ItemActions,
  LocalItemActions,
} from '../constants/actionTypes';
import {
  IItemFactoryWithGenerator,
  itemFactory
} from '../utils/itemFactory';

import { IAction } from './IAction';
import {
  fetchActionBuilderComposed,
  fetchHasFailed,
  fetchHasSucceededBuilder,
  fetchIsLoading
} from './fetchActions';
import {
  postItemDataActionFactory,
  repostItemDataActionFactory
} from './postDataActionFactory';
import { fetchDataActionFactory } from './fetchDataActionFactory';
import { putDataActionFactory } from './putDataActionFactory';
import { deleteDataActionFactory } from './deleteDataActionFactory';
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


export const fetchData = fetchDataActionFactory({
  fetchOperation: fetch,
  startLoader: fetchStartLoading,
  stopLoader: fetchStopLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint
});


const postSuccess = fetchActionBuilderComposed(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.success);
const postError = fetchActionBuilderComposed(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.error);

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


const putSuccess = fetchActionBuilderComposed(ItemActions.PUT_ITEM_TO_SERVER, EHttpActionStatus.success);
const putError = fetchActionBuilderComposed(ItemActions.PUT_ITEM_TO_SERVER, EHttpActionStatus.error);

export const putData = putDataActionFactory({
  putOperation: putAction,
  onPutSuccess: putSuccess,
  onPutError: putError,
  updateItemOperation: updateItem,
  apiEndpoint
});


const deleteError = fetchActionBuilderComposed(ItemActions.DELETE_ITEM_TO_SERVER, EHttpActionStatus.error);

export const deleteData = deleteDataActionFactory({
  deleteOperation: deleteAction,
  onDeleteError: deleteError,
  onDeleteSuccess: deleteItem,
  apiEndpoint
});
