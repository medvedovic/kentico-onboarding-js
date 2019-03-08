import { Map } from 'immutable';

import {
  CREATE_ITEM,
  DELETE_ITEM,
  FETCH_DATA,
  POST_ITEM_TO_SERVER,
  UPDATE_ITEM,
} from '../../../constants/actionTypes';
import { item } from './item';

import { Reducer } from '../../reducers';
import { ListItemData } from '../../../models/ListItemData';

export const data: Reducer.Data = (state = Map(), action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const newItem = action.payload.item;

      return state.set(action.payload.item.id, newItem);
    }

    case POST_ITEM_TO_SERVER.SUCCESS: {
      const existingItem = state.get(action.payload.temporaryId);
      const newItem = item(existingItem, action);
      return state
        .delete(action.payload.temporaryId)
        .set(action.payload.item.id, newItem);
    }

    case UPDATE_ITEM: {
      const existingItem = state.get(action.payload.item.id);
      const newItem = item(existingItem, action);

      return state.set(action.payload.item.id, newItem);
    }

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case FETCH_DATA.HAS_SUCCEEDED: {
      action.payload.items.forEach((listItemData: ListItemData) => {
        state = state.set(listItemData.id, listItemData);
      });

      return state;
    }

    default:
      return state;
  }
};
