import { HttpAction } from '../constants/HttpAction';
import { POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER,
  DELETE_ITEM_TO_SERVER_FAILURE
} from '../constants/actionTypes';
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
  onSuccess: httpActionSuccessFactory(POST_ITEM_TO_SERVER.SUCCESS),
  onError: httpActionErrorFactory(POST_ITEM_TO_SERVER.FAILURE),
  createItemOperation: createItem,
  apiEndpoint
});

export const putData = putDataActionFactory({
  operation: updateItemOnServer,
  onSuccess: httpActionSuccessFactory(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: httpActionErrorFactory(PUT_ITEM_TO_SERVER.FAILURE),
  updateItemOperation: updateItem,
  apiEndpoint
});

export const redoPostData = redoRequestToServerFactory({
  operation: createItemOnServer,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: httpActionSuccessFactory(POST_ITEM_TO_SERVER.SUCCESS),
  onError: httpActionErrorFactory(POST_ITEM_TO_SERVER.FAILURE),
  apiEndpoint
});

export const redoPutData = redoRequestToServerFactory({
  operation: updateItemOnServer,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: httpActionSuccessFactory(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: httpActionErrorFactory(PUT_ITEM_TO_SERVER.FAILURE),
  apiEndpoint
});

export const deleteData = redoRequestToServerFactory({
  operation: removeItemOnServer,
  onError: httpActionErrorFactory(DELETE_ITEM_TO_SERVER_FAILURE),
  onSuccess: deleteItem,
  apiEndpoint
});
