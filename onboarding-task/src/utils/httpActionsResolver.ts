import { ItemActions } from '../constants/actionTypes';
import {
  deleteData,
  redoPostData,
  redoPutData
} from '../actions/publicActions';


export const httpActionResolver = (localId: string, method: string) => {
  switch (method) {
    case ItemActions.POST_ITEM_TO_SERVER:
      return redoPostData(localId);

    case ItemActions.PUT_ITEM_TO_SERVER:
      return redoPutData(localId);

    case ItemActions.DELETE_ITEM_TO_SERVER:
      return deleteData(localId);

    default:
      throw new Error('Missing method');
  }
};
