import { HttpAction } from '../constants/HttpAction';
import {
  POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER,
  DELETE_ITEM_TO_SERVER_FAILURE
} from '../constants/actionTypes';
import { apiEndpoint } from '../constants/apiEndpoint';
import {
  createItem,
  updateItem,
  deleteItem,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading,
} from './actionCreators';
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


const getItemsFromServer = fetchBuilder(fetch, HttpAction.GET);
const removeItemOnServer = fetchBuilder(fetch, HttpAction.DELETE);
const createItemOnServer = fetchBuilder<IServerItemDataModel>(fetch, HttpAction.POST);
const updateItemOnServer = fetchBuilder<IServerItemDataModel>(fetch, HttpAction.PUT);


export const fetchData = fetchDataActionFactory({
  fetchOperation: getItemsFromServer,
  fetchIsLoading: fetchIsLoading,
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
