import { Map } from 'immutable';

import {
  FetchData,
  LocalItemActions,
  POST_ITEM_TO_SERVER
} from '../../../constants/actionTypes';
import { item } from './item';

import { Reducer } from '../../reducers';
import { ListItemData } from '../../../models/ListItemData';

export const data: Reducer.Data = (state = Map(), action) => {
  switch (action.type) {
    case LocalItemActions.CREATE_ITEM: {
      const newItem = action.payload.item;

      return state.set(action.payload.item.id, newItem);
    }

    case POST_ITEM_TO_SERVER.SUCCESS: {
      const existingItem = state.get(action.payload.id);
      const newItem = item(existingItem, action);
      return state
        .delete(action.payload.id)
        .set(action.payload.item.id, newItem);
    }

    case LocalItemActions.UPDATE_ITEM: {
      const existingItem = state.get(action.payload.item.id);
      const newItem = item(existingItem, action);

      return state.set(action.payload.item.id, newItem);
    }

    case LocalItemActions.DELETE_ITEM:
      return state.delete(action.payload.id);

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: ListItemData) => {
        state = state.set(item.id, item);
      });

      return state;
    }

    default:
      return state;
  }
};
