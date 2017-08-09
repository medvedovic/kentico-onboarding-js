import {
  CREATE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../../../constants/actionTypes';
import { ListItemFlag } from '../../../models/ListItemFlag';

export const flag = (state = new ListItemFlag(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return new ListItemFlag();
    case TOGGLE_BEING_EDITED:
      return new ListItemFlag({
        ...state,
        isBeingEdited: !state.isBeingEdited,
      });
    default:
      return state;
  }
};
