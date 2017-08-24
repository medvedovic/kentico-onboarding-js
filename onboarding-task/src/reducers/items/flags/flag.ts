import {
  CREATE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../../../constants/actionTypes';
import {
  IListItemFlags,
  ListItemFlags
} from '../../../models/ListItemFlags';

import { IReducer } from '../../../interfaces';

export const flag: IReducer<IListItemFlags> = (state = new ListItemFlags(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return new ListItemFlags();
    case TOGGLE_BEING_EDITED:
      return new ListItemFlags({
        ...state,
        isBeingEdited: !state.isBeingEdited,
      });
    default:
      return state;
  }
};
