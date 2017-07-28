import {
  CREATE_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../constants/actionTypes';
import { updateItemReducer as itemReducer } from './updateItemReducer';

export const items = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const { item } = action.payload;

      return state.set(item.guid, item);
    }
    case UPDATE_ITEM: {
      const toBeUpdated = state.get(action.payload.item.guid);
      const updatedItem = itemReducer(toBeUpdated, action);

      return state.set(action.payload.item.guid, updatedItem);
    }
    case DELETE_ITEM:
      return state.delete(action.payload.itemGuid);
    default:
      return state;
  }
};
