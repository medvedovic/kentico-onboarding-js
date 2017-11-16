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
import { toServerItemDataViewModel } from '../models/IServerItemDataModel';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import { fetchDataThunkFactory } from './httpActionFactories/fetchDataThunkFactory';
import {
  postItemDataThunkFactory,
  repostRequestThunkFactory
} from './httpActionFactories/postDataThunkFactory';
import {
  handleErrorRequest,
  handleSuccessfulPost,
  handleSuccessfulRequest
} from './httpActionFactories/requestStatusActions';
import { putDataThunkFactory } from './httpActionFactories/putDataThunkFactory';
import { reputItemThunkFactory} from './httpActionFactories/putDataThunkFactory';
import { listItemDataConverter } from '../utils/listItemDataConverter';
import { deleteItemThunkFactory } from './httpActionFactories/deleteItemThunkFactory';

const sendRequest = fetchBuilder(fetch);

export const fetchData = fetchDataThunkFactory({
  fetchOperation: sendRequest,
  fetchIsLoading: fetchIsLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint
});

export const postData = postItemDataThunkFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulPost,
  onError: handleErrorRequest(POST_ITEM_TO_SERVER.FAILURE),
  createItem: listItemDataConverter,
  onItemCreated: createItem,
  apiEndpoint
});

export const putData = putDataThunkFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  updateItem,
  apiEndpoint
});

export const redoPostData = repostRequestThunkFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulPost,
  onError: handleErrorRequest(POST_ITEM_TO_SERVER.FAILURE),
  apiEndpoint
});

export const redoPutData = reputItemThunkFactory({
  operation: sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  apiEndpoint
});

export const deleteData = deleteItemThunkFactory({
  operation: sendRequest,
  onError: handleErrorRequest(DELETE_ITEM_AT_SERVER_FAILURE),
  onSuccess: deleteItem,
  apiEndpoint
});
