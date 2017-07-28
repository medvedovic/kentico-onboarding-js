import { TOGGLE_BEING_EDITED } from '../constants/actionTypes';
import { ListItemFlag } from '../models/ListItemFlag';

export const updateFlagsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_BEING_EDITED:
      return new ListItemFlag({
        ...state,
        isBeingEdited: !state.isBeingEdited,
      });
    default:
      return state;
  }
};
