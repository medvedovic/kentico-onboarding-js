import { UPDATE_ITEM } from '../constants/actionTypes';
import { ListItem } from '../models/ListItem';

export const item = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return new ListItem({
        ...action.payload.item,
        value: action.payload.item.value,
      });
    default:
      return state;
  }
};
