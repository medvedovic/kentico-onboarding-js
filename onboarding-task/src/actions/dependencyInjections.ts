import { HttpAction } from '../constants/HttpAction';
import { ItemActions } from '../constants/actionTypes';
import { apiEndpoint } from '../constants/apiEndpoint';
import {
  createItem,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading, updateItem
} from './actionCreators';
import {
  deleteItem} from './actionCreators';
import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../models/IServerItemDataModel';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import { fetchDataActionFactory } from './httpActionFactories/fetchDataActionFactory';
import { postItemDataActionFactory } from './httpActionFactories/postDataActionFactory';
import {
  httpActionErrorFactory,
  httpActionSuccessFactory
} from './httpActionFactories/httpActionStatusFactories';
import { putDataActionFactory } from './httpActionFactories/putDataActionFactory';
import { redoRequestToServerFactory } from './httpActionFactories/redoRequestToServerFactory';


const getItemsFromServer = (url: string) => fetchBuilder(fetch)(url, HttpAction.GET);
const removeItemOnServer = (url: string) => fetchBuilder(fetch)(url, HttpAction.DELETE);
const createItemOnServer = (url: string, itemDto: IServerItemDataModel) =>
  fetchBuilder<IServerItemDataModel>(fetch)(url, HttpAction.POST, itemDto);
const updateItemOnServer = (url: string, itemDto: IServerItemDataModel) =>
  fetchBuilder<IServerItemDataModel>(fetch)(url, HttpAction.PUT, itemDto);


export const fetchData = fetchDataActionFactory({
  fetchOperation: getItemsFromServer,
  startLoader: fetchIsLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint
});

export const postData = postItemDataActionFactory({
  operation: createItemOnServer,
  onSuccess: httpActionSuccessFactory(ItemActions.POST_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.POST_ITEM_TO_SERVER),
  createItemOperation: createItem,
  apiEndpoint
});

export const putData = putDataActionFactory({
  operation: updateItemOnServer,
  onSuccess: httpActionSuccessFactory(ItemActions.PUT_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.PUT_ITEM_TO_SERVER),
  updateItemOperation: updateItem,
  apiEndpoint
});

export const redoPostData = redoRequestToServerFactory({
  operation: createItemOnServer,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: httpActionSuccessFactory(ItemActions.POST_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.POST_ITEM_TO_SERVER),
  apiEndpoint
});

export const redoPutData = redoRequestToServerFactory({
  operation: updateItemOnServer,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: httpActionSuccessFactory(ItemActions.PUT_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.PUT_ITEM_TO_SERVER),
  apiEndpoint
});

export const deleteData = redoRequestToServerFactory({
  operation: removeItemOnServer,
  onError: httpActionErrorFactory(ItemActions.DELETE_ITEM_TO_SERVER),
  onSuccess: deleteItem,
  apiEndpoint
});
