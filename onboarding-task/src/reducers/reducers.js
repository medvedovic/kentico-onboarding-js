import { combineReducers } from 'redux';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../constants/actionTypes';
import { ListItem as ListItemModel } from '../models/ListItem';

export const listApp = (items = {}, action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const { item } = action;

      return items.set(item.guid, item);
    }
    case UPDATE_ITEM:
      return items.set(action.item.guid, new ListItemModel({
        ...action.item,
        value: action.item.value,
      }));
    case DELETE_ITEM:
      return items.delete(action.itemGuid);
    default:
      return items;
  }
};

export const reducer = combineReducers({
  items: listApp,
});
