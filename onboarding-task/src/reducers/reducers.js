import { combineReducers } from 'redux';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../actions/actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { ListItemModel } from '../model/ListItemModel';

export const listApp = (items = {}, action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const guid = generateGuid();

      return items.set(guid, new ListItemModel({
        guid,
        value: action.value,
      }));
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
