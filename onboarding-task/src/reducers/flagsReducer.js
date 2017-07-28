import { CREATE_ITEM,
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';
import { ListItemFlag } from '../models/ListItemFlag';
import { updateFlagsReducer } from './updateFlagsReducer';

export const flagsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_BEING_EDITED: {
      const itemFlags = state.get(action.payload.itemGuid);
      const newFlags = updateFlagsReducer(itemFlags, action);

      return state.set(action.payload.itemGuid, newFlags);
    }
    case CREATE_ITEM:
      return state.set(action.payload.item.guid, new ListItemFlag());
    case DELETE_ITEM:
      return state.delete(action.payload.itemGuid);
    default:
      return state;
  }
};
