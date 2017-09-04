import { Map } from 'immutable';

import {
  CREATE_ITEM,
  DELETE_ITEM,
  FetchData,
  HttpAction,
  UPDATE_ITEM,
} from '../../../constants/actionTypes';
import { item } from './item';

import { Reducer } from '../../reducers';
import { ListItemData } from '../../../models/ListItemData';

export const data: Reducer.Data = (state = Map(), action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const newItem = action.payload.item;

      return state.set(newItem.localId, newItem);
    }

    case HttpAction.POST:
    case HttpAction.PUT:
    case UPDATE_ITEM: {
      const existingItem = state.get(action.payload.item.localId);
      const newItem = item(existingItem, action);

      return state.set(action.payload.item.localId, newItem);
    }

    case DELETE_ITEM:
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
