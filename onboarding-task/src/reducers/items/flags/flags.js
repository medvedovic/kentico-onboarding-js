import { Map } from 'immutable';
import { CREATE_ITEM,
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../../../constants/actionTypes';
import { flag } from './flag';

export const flags = (state = new Map(), action) => {
  switch (action.type) {
    case TOGGLE_BEING_EDITED: {
      const itemFlags = state.get(action.payload.itemId);
      const newFlags = flag(itemFlags, action);

      return state.set(action.payload.itemId, newFlags);
    }
    case CREATE_ITEM: {
      const newFlags = flag(undefined, action);

      return state.set(action.payload.item.id, newFlags);
    }
    case DELETE_ITEM:
      return state.delete(action.payload.itemId);
    default:
      return state;
  }
};
