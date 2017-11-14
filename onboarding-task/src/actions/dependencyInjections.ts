import { HttpAction } from '../constants/HttpAction';
import {
  POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER,
  DELETE_ITEM_AT_SERVER_FAILURE
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
  //IServerItemDataModel,
  toServerItemDataViewModel
} from '../models/IServerItemDataModel';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import { fetchDataActionFactory } from './httpActionFactories/fetchDataActionFactory';
import { postItemDataActionFactory } from './httpActionFactories/postDataActionFactory';
import {
  handleErrorRequest,
  handleSuccessfulRequest
} from './httpActionFactories/httpActionStatusFactories';
import { putDataActionFactory } from './httpActionFactories/putDataActionFactory';
import { redoRequestToServerFactory } from './httpActionFactories/redoRequestToServerFactory';
import { listItemDataConverter } from '../utils/listItemDataConverter';
import { deleteItemThunkFactory } from './httpActionFactories/deleteItemThunkFactory';

const sendRequest = fetchBuilder(fetch);

export const fetchData = fetchDataActionFactory({
  fetchOperation: sendRequest,
  fetchIsLoading: fetchIsLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  httpMethod: HttpAction.GET,
  apiEndpoint
});

export const postData = postItemDataActionFactory({
  operation: sendRequest,
  onSuccess: handleSuccessfulRequest(POST_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(POST_ITEM_TO_SERVER.FAILURE),
  createItem: listItemDataConverter,
  onItemCreated: createItem,
  httpMethod: HttpAction.POST,
  apiEndpoint
});

export const putData = putDataActionFactory({
  operation: sendRequest,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  updateItem: updateItem,
  httpMethod: HttpAction.PUT,
  apiEndpoint
});

export const redoPostData = redoRequestToServerFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(POST_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(POST_ITEM_TO_SERVER.FAILURE),
  httpMethod: HttpAction.POST,
  apiEndpoint
});

export const redoPutData = redoRequestToServerFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  httpMethod: HttpAction.PUT,
  apiEndpoint
});

export const deleteData = deleteItemThunkFactory({
  operation: sendRequest,
  onError: handleErrorRequest(DELETE_ITEM_AT_SERVER_FAILURE),
  onSuccess: deleteItem,
  httpMethod: HttpAction.DELETE,
  apiEndpoint
});
