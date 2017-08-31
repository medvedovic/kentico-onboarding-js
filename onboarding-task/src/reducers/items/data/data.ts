import { Map } from 'immutable';

import {
  CREATE_ITEM,
  DELETE_ITEM,
  FetchData,
  UPDATE_ITEM,
} from '../../../constants/actionTypes';
import { item } from './item';

import { Reducer } from '../../reducers';
import { ListItemData } from '../../../models/ListItemData';

export const data: Reducer.Data = (state = Map(), action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const newItem = action.payload.item;

      return state.set(newItem.id, newItem);
    }

    case UPDATE_ITEM: {
      const existingItem = state.get(action.payload.item.id);
      const newItem = item(existingItem, action);

      return state.set(action.payload.item.id, newItem);
    }

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: any) => {
        const newItem = new ListItemData({
          id: item.Id.toString(),
          value: item.Value,
        });
        state = state.set(newItem.id.toString(), newItem);
      });

      return state;
    }

    default:
      return state;
  }
};
