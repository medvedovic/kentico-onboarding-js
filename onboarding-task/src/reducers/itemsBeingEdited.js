import { DELETE_ITEM, TOGGLE_BEING_EDITED } from '../constants/actionTypes';

export const itemsBeingEdited = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_BEING_EDITED: {
      const isBeingEdited = state.get(action.itemGuid);

      return state.set(action.itemGuid, !isBeingEdited);
    }
    case DELETE_ITEM:
      return state.delete(action.itemGuid);
    default:
      return state;
  }
};
