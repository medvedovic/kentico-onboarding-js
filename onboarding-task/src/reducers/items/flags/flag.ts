import {
  CREATE_ITEM,
  EHttpActionStatus,
  HttpAction,
  TOGGLE_BEING_EDITED,
} from '../../../constants/actionTypes';

import { ListItemFlags } from '../../../models/ListItemFlags';
import { IReducer } from '../../IReducer';

export const flag: IReducer<ListItemFlags> = (state = new ListItemFlags(), action) => {
  switch (action.type) {
    case HttpAction.PUT:
    case HttpAction.POST:
    case CREATE_ITEM: {
      if (action.status === EHttpActionStatus.error) {
        return new ListItemFlags({
          isSavedSuccess: false
        });
      }
      return state;
    }

    case HttpAction.DELETE: {
      if (action.status === EHttpActionStatus.error) {
        return state.alter({
          isBeingEdited: false
        });
      }
      return state;
    }

    case TOGGLE_BEING_EDITED:
      return state.alter({
        isBeingEdited: !state.isBeingEdited
      });

    default:
      return state;
  }
};
