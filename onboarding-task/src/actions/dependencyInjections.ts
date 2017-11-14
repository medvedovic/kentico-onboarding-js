import { HttpAction } from '../constants/HttpAction';
import {
  PUT_ITEM_TO_SERVER,
  DELETE_ITEM_AT_SERVER_FAILURE
} from '../constants/actionTypes';
import { apiEndpoint } from '../constants/apiEndpoint';
import {
  updateItem,
  deleteItem,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading,
} from './actionCreators';
import {
  toServerItemDataViewModel
} from '../models/IServerItemDataModel';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import { fetchDataThunkFactory } from './httpActionFactories/fetchDataThunkFactory';
import {
  handleErrorRequest,
  handleSuccessfulRequest
} from './httpActionFactories/requestStatusActions';
import { putDataThunkFactory } from './httpActionFactories/putDataThunkFactory';
import {
  reputItemThunkFactory} from './httpActionFactories/putDataThunkFactory';
import { deleteItemThunkFactory } from './httpActionFactories/deleteItemThunkFactory';

const sendRequest = fetchBuilder(fetch);

export const fetchData = fetchDataThunkFactory({
  fetchOperation: sendRequest,
  fetchIsLoading: fetchIsLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  httpMethod: HttpAction.GET,
  apiEndpoint
});

export const putData = putDataThunkFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  updateItem: updateItem,
  httpMethod: HttpAction.PUT,
  apiEndpoint
});

export const redoPutData = reputItemThunkFactory({
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
