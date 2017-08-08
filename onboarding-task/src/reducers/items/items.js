import { OrderedMap } from 'immutable';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../../constants/actionTypes';
import { item as itemReducer } from './item';

export const items = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const { item } = action.payload;

      return state.set(item.id, item);
    }
    case UPDATE_ITEM: {
      const toBeUpdated = state.get(action.payload.item.id);
      const updatedItem = itemReducer(toBeUpdated, action);

      return state.set(action.payload.item.id, updatedItem);
    }
    case DELETE_ITEM:
      return state.delete(action.payload.itemId);
    default:
      return state;
  }
};
