import {
  CREATE_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../constants/actionTypes';
import { item as itemReducer } from './itemReducer';

export const items = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const { item } = action;

      return state.set(item.guid, item);
    }
    case UPDATE_ITEM: {
      const toBeUpdated = state.get(action.item.guid);
      const updatedItem = itemReducer(toBeUpdated, action);

      return state.set(action.item.guid, updatedItem);
    }
    case DELETE_ITEM:
      return state.delete(action.itemGuid);
    default:
      return state;
  }
};
