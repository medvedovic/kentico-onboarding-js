import {
  ItemActions,
  LocalItemActions,
} from '../../../constants/actionTypes';
import {  ListItemData } from '../../../models/ListItemData';

import { IReducer } from '../../IReducer';
import { HttpActionStatus } from '../../../constants/HttpActionStatus';

export const item: IReducer<ListItemData> = (state = new ListItemData(), action) => {
  switch (action.type) {
    case ItemActions.POST_ITEM_TO_SERVER: {
      if (action.payload.status === HttpActionStatus.success) {
        return state.alter({
          id: action.payload.item.id,
          value: action.payload.item.value
        });
      }
      return state;
    }

    case LocalItemActions.UPDATE_ITEM:
      return state.alter({
        value: action.payload.item.value
      });

    default:
      return state;
  }
};
