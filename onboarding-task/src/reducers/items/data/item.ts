import {
  EHttpActionStatus,
  ItemActions,
  LocalItemActions,
} from '../../../constants/actionTypes';
import {  ListItemData } from '../../../models/ListItemData';

import { IReducer } from '../../IReducer';

export const item: IReducer<ListItemData> = (state = new ListItemData(), action) => {
  switch (action.type) {
    case ItemActions.POST_ITEM_TO_SERVER:
    case ItemActions.PUT_ITEM_TO_SERVER: {
      if (action.status === EHttpActionStatus.success) {
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
