import {
  DELETE_ITEM_TO_SERVER,
  POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER
} from '../constants/actionTypes';
import {
  deleteData,
  redoPostData,
  redoPutData
} from '../actions/publicActions';


export const httpActionResolver = (localId: string, method: string) => {
  switch (method) {
    case POST_ITEM_TO_SERVER.FAILURE:
      return redoPostData(localId);

    case PUT_ITEM_TO_SERVER.FAILURE:
      return redoPutData(localId);

    case DELETE_ITEM_TO_SERVER:
      return deleteData(localId);

    default:
      throw new Error('Missing method');
  }
};
