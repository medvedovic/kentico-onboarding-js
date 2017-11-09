import {
  DELETE_ITEM_TO_SERVER_FAILURE,
  LocalItemActions, POST_ITEM_TO_SERVER, PUT_ITEM_TO_SERVER,
} from '../../../constants/actionTypes';

import { ListItemFlags } from '../../../models/ListItemFlags';
import { IReducer } from '../../IReducer';

export const flag: IReducer<ListItemFlags> = (state = new ListItemFlags(), action) => {
  switch (action.type) {
    case PUT_ITEM_TO_SERVER.FAILURE:
    case POST_ITEM_TO_SERVER.FAILURE:
    case DELETE_ITEM_TO_SERVER_FAILURE:
      return state.alter({
        isSavedSuccess: false,
        failedHttpAction: action.type
      });

    case LocalItemActions.TOGGLE_BEING_EDITED:
      return state.alter({
        isBeingEdited: !state.isBeingEdited
      });

    default:
      return state;
  }
};
