import {
  LocalItemActions,
  POST_ITEM_TO_SERVER,
} from '../../../constants/actionTypes';
import {  ListItemData } from '../../../models/ListItemData';

import { IReducer } from '../../IReducer';

export const item: IReducer<ListItemData> = (state = new ListItemData(), action) => {
  switch (action.type) {
    case POST_ITEM_TO_SERVER.SUCCESS:
      return state.alter({
        id: action.payload.item.id,
        value: action.payload.item.value
      });

    case LocalItemActions.UPDATE_ITEM:
      return state.alter({
        value: action.payload.item.value
      });

    default:
      return state;
  }
};
