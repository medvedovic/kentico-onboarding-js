import {
  CREATE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../../../constants/actionTypes';

import { ListItemFlags } from '../../../models/ListItemFlags';
import { IReducer } from '../../../interfaces';

export const flag: IReducer<ListItemFlags> = (state = new ListItemFlags(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return new ListItemFlags();
    case TOGGLE_BEING_EDITED:
      return state.alter({
        isBeingEdited: !state.isBeingEdited
      });
    default:
      return state;
  }
};
