import { HttpAction } from '../constants/HttpAction';
import {
  DELETE_ITEM_AT_SERVER_FAILURE
} from '../constants/actionTypes';
import { apiEndpoint } from '../constants/apiEndpoint';
import {
  deleteItem,
} from './actionCreators';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import {
  handleErrorRequest,
} from './httpActionFactories/requestStatusActions';
import { deleteItemThunkFactory } from './httpActionFactories/deleteItemThunkFactory';

const sendRequest = fetchBuilder(fetch);

export const deleteData = deleteItemThunkFactory({
  operation: sendRequest,
  onError: handleErrorRequest(DELETE_ITEM_AT_SERVER_FAILURE),
  onSuccess: deleteItem,
  httpMethod: HttpAction.DELETE,
  apiEndpoint
});
