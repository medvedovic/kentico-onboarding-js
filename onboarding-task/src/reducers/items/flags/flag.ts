import {
  EHttpActionStatus,
  ItemActions,
  LocalItemActions,
} from '../../../constants/actionTypes';

import { ListItemFlags } from '../../../models/ListItemFlags';
import { IReducer } from '../../IReducer';

export const flag: IReducer<ListItemFlags> = (state = new ListItemFlags(), action) => {
  switch (action.type) {
    case ItemActions.PUT_ITEM_TO_SERVER:
    case ItemActions.POST_ITEM_TO_SERVER:
    case ItemActions.DELETE_ITEM_TO_SERVER:
    case LocalItemActions.CREATE_ITEM: {
      if (action.status === EHttpActionStatus.error) {
        return new ListItemFlags({
          isSavedSuccess: false,
          failedHttpAction: action.type
        });
      }
      return state;
    }

    case LocalItemActions.TOGGLE_BEING_EDITED:
      return state.alter({
        isBeingEdited: !state.isBeingEdited
      });

    default:
      return state;
  }
};
