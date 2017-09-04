import {
  EHttpActionStatus,
  HttpAction,
  UPDATE_ITEM
} from '../../../constants/actionTypes';
import {  ListItemData } from '../../../models/ListItemData';

import { IReducer } from '../../IReducer';

export const item: IReducer<ListItemData> = (state = new ListItemData(), action) => {
  switch (action.type) {
    case HttpAction.POST:
    case HttpAction.PUT: {
      if (action.status === EHttpActionStatus.success) {
        return state.alter({
          id: action.payload.item.id,
          value: action.payload.item.value
        });
      }
      return state;
    }

    case UPDATE_ITEM:
      return state.alter({
        id: action.payload.item.id,
        value: action.payload.item.value
      });

    default:
      return state;
  }
};
