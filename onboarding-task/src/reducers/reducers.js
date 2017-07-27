import { combineReducers } from 'redux';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../constants/actionTypes';
import { ListItem as ListItemModel } from '../models/ListItem';

export const items = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const { item } = action;

      return state.set(item.guid, item);
    }
    case UPDATE_ITEM:
      return state.set(action.item.guid, new ListItemModel({
        ...action.item,
        value: action.item.value,
      }));
    case DELETE_ITEM:
      return state.delete(action.itemGuid);
    default:
      return state;
  }
};

export const reducer = combineReducers({
  items,
});
