import { ItemActions } from '../constants/actionTypes';
import {
  deleteData,
  repostData,
  reputData
} from '../actions/publicActions';

export const httpActionDispatcher = (localId: string, method: string) => {
  switch (method) {
    case ItemActions.POST_ITEM_TO_SERVER:
      return repostData(localId);

    case ItemActions.PUT_ITEM_TO_SERVER:
      return reputData(localId);

    case ItemActions.DELETE_ITEM_TO_SERVER:
      return deleteData(localId);

    default:
      return;
  }
};
