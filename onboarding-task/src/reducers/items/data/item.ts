import { UPDATE_ITEM } from '../../../constants/actionTypes';
import {
  IListItemData,
  ListItemData
} from '../../../models/ListItemData';
import { IReducer } from '../../../interfaces';

export const item: IReducer<IListItemData> = (state = new ListItemData(), action) => {
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
