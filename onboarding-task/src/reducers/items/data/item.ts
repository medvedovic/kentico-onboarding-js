import { UPDATE_ITEM } from '../../../constants/actionTypes';
import {  ListItemData } from '../../../models/ListItemData';

import { IReducer } from '../../../interfaces';

export const item: IReducer<ListItemData> = (state = new ListItemData(), action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return state.alter({
        value: action.payload.item.value
      });
    default:
      return state;
  }
};
