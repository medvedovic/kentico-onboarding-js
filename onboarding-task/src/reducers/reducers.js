import { OrderedMap } from 'immutable';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../actions/actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { ListItemModel } from '../model/ListItemModel';

export const listApp = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return state.set(generateGuid(), new ListItemModel({
        value: action.item.value,
      }));
    case UPDATE_ITEM:
      return state.set(action.key, new ListItemModel({
        ...action.item, value: action.item.value,
      }));
    case DELETE_ITEM:
      return state.delete(action.item.key);
    default:
      return state;
  }
};
