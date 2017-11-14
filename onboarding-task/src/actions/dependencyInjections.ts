import { HttpAction } from '../constants/HttpAction';
import {
  DELETE_ITEM_AT_SERVER_FAILURE
} from '../constants/actionTypes';
import { apiEndpoint } from '../constants/apiEndpoint';
import {
  deleteItem,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading,
} from './actionCreators';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import { fetchDataThunkFactory } from './httpActionFactories/fetchDataThunkFactory';
import {
  handleErrorRequest,
} from './httpActionFactories/requestStatusActions';
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

export const deleteData = deleteItemThunkFactory({
  operation: sendRequest,
  onError: handleErrorRequest(DELETE_ITEM_AT_SERVER_FAILURE),
  onSuccess: deleteItem,
  httpMethod: HttpAction.DELETE,
  apiEndpoint
});
