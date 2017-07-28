import { UPDATE_ITEM } from '../constants/actionTypes';
import { ListItemData } from '../models/ListItemData';

export const updateItemReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return new ListItemData({
        ...action.payload.item,
        value: action.payload.item.value,
      });
    default:
      return state;
  }
};
