import {
  EHttpActionStatus,
  HttpAction,
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
  postItemDataCore,
} from './httpActionFactories/postDataActionFactory';
import { fetchDataActionFactory } from './httpActionFactories/fetchDataActionFactory';
import {
  putDataActionFactory,
  putDataActionFactoryCore
} from './httpActionFactories/putDataActionFactory';
import {
  deleteDataActionFactoryCore
} from './httpActionFactories/deleteDataActionFactory';
import {
  deleteItem,
  updateItem
} from './userActions';
import { apiEndpoint } from '../constants/AppSettings';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../models/ItemDataDTO';
import { itemDataActionFactory } from './httpActionFactories/itemDataActionFactory';


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


const httpActionBuilderWithFetch = fetchBuilder(fetch);

const getItemsAction = (url: string) =>
  httpActionBuilderWithFetch(url);

const deleteAction = (url: string) =>
  httpActionBuilderWithFetch(url, HttpAction.DELETE);

const postAction = (url: string, itemDto: IItemDataDTO) =>
  httpActionBuilderWithFetch(url, HttpAction.POST, itemDto);

const putAction = (url: string, itemDto: IItemDataDTO) =>
  httpActionBuilderWithFetch(url, HttpAction.PUT, itemDto);


export const fetchData = fetchDataActionFactory({
  fetchOperation: getItemsAction,
  startLoader: fetchStartLoading,
  stopLoader: fetchStopLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint
});


const postSuccess = fetchActionBuilderComposed(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.success);
const postError = fetchActionBuilderComposed(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.error);

export const postData = postItemDataActionFactory({
  operation: postAction,
  onSuccess: postSuccess,
  onError: postError,
  createItemOperation: createItem,
  apiEndpoint
});

export const repostData = itemDataActionFactory(postItemDataCore, {
  operation: postAction,
  transformDataToDto: toItemDataDTO,
  onSuccess: postSuccess,
  onError: postError,
  apiEndpoint
});


const putSuccess = fetchActionBuilderComposed(ItemActions.PUT_ITEM_TO_SERVER, EHttpActionStatus.success);
const putError = fetchActionBuilderComposed(ItemActions.PUT_ITEM_TO_SERVER, EHttpActionStatus.error);

export const putData = putDataActionFactory({
  operation: putAction,
  onSuccess: putSuccess,
  onError: putError,
  updateItemOperation: updateItem,
  apiEndpoint
});

export const reputData = itemDataActionFactory(putDataActionFactoryCore, {
  operation: putAction,
  transformDataToDto: toItemDataDTO,
  onSuccess: putSuccess,
  onError: putError,
  apiEndpoint
});


const deleteError = fetchActionBuilderComposed(ItemActions.DELETE_ITEM_TO_SERVER, EHttpActionStatus.error);

export const deleteData = itemDataActionFactory(deleteDataActionFactoryCore, {
  operation: deleteAction,
  onError: deleteError,
  onSuccess: deleteItem,
  apiEndpoint
});
