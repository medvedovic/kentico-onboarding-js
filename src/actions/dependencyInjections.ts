import {
  POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER,
  DELETE_ITEM_AT_SERVER_FAILURE,
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
  repostRequestThunkFactory,
} from './httpActionFactories/postDataThunkFactory';
import {
  requestHasFailed,
  postRequestHasSucceeded,
  requestHasSucceeded,
} from './httpActionFactories/requestStatusActions';
import { putDataThunkFactory } from './httpActionFactories/putDataThunkFactory';
import { reputItemThunkFactory} from './httpActionFactories/putDataThunkFactory';
import { listItemDataConverter } from '../utils/listItemDataConverter';
import { deleteItemThunkFactory } from './httpActionFactories/deleteItemThunkFactory';

const sendRequest = fetchBuilder(fetch);

export const fetchData = fetchDataThunkFactory({
  sendRequest,
  fetchIsLoading: fetchIsLoading,
  convertItem: listItemDataConverter,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint,
});

export const postData = postItemDataThunkFactory({
  sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: postRequestHasSucceeded,
  onError: requestHasFailed(POST_ITEM_TO_SERVER.FAILURE),
  createItem: listItemDataConverter,
  onItemCreated: createItem,
  apiEndpoint,
});

export const putData = putDataThunkFactory({
  sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: requestHasSucceeded(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: requestHasFailed(PUT_ITEM_TO_SERVER.FAILURE),
  updateItem,
  apiEndpoint,
});

export const redoPostData = repostRequestThunkFactory({
  sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: postRequestHasSucceeded,
  onError: requestHasFailed(POST_ITEM_TO_SERVER.FAILURE),
  apiEndpoint,
});

export const redoPutData = reputItemThunkFactory({
  sendRequest,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: requestHasSucceeded(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: requestHasFailed(PUT_ITEM_TO_SERVER.FAILURE),
  apiEndpoint,
});

export const deleteData = deleteItemThunkFactory({
  sendRequest,
  onError: requestHasFailed(DELETE_ITEM_AT_SERVER_FAILURE),
  onSuccess: deleteItem,
  apiEndpoint,
});
