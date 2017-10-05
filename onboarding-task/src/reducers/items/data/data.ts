import { Map } from 'immutable';

import {
  ItemActions,
  FetchData,
  LocalItemActions,
} from '../../../constants/actionTypes';
import { item } from './item';

import { Reducer } from '../../reducers';
import { ListItemData } from '../../../models/ListItemData';

export const data: Reducer.Data = (state = Map(), action) => {
  switch (action.type) {
    case LocalItemActions.CREATE_ITEM: {
      const newItem = action.payload.item;

      return state.set(newItem.localId, newItem);
    }

    case ItemActions.POST_ITEM_TO_SERVER:
    case ItemActions.PUT_ITEM_TO_SERVER:
    case LocalItemActions.UPDATE_ITEM: {
      const existingItem = state.get(action.payload.item.localId);
      const newItem = item(existingItem, action);

      return state.set(action.payload.item.localId, newItem);
    }

    case LocalItemActions.DELETE_ITEM:
      return state.delete(action.payload.id);

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: ListItemData) => {
        state = state.set(item.localId, item);
      });

      return state;
    }

    default:
      return state;
  }
};
