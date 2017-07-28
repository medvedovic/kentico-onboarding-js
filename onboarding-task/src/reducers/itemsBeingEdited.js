import { DELETE_ITEM, TOGGLE_BEING_EDITED } from '../constants/actionTypes';

export const itemsBeingEdited = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_BEING_EDITED: {
      const isBeingEdited = state.get(action.payload.itemGuid);

      return state.set(action.payload.itemGuid, !isBeingEdited);
    }
    case DELETE_ITEM:
      return state.delete(action.payload.itemGuid);
    default:
      return state;
  }
};
