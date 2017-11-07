import { Map } from 'immutable';

import {
  DELETE_ITEM_TO_SERVER,
  FetchData,
  LocalItemActions, POST_ITEM_TO_SERVER, PUT_ITEM_TO_SERVER,
} from '../../../constants/actionTypes';
import { flag } from './flag';

import { Reducer } from '../../reducers';
import { ListItemFlags } from '../../../models/ListItemFlags';
import { ListItemData } from '../../../models/ListItemData';

export const flags: Reducer.Flags = (state = Map(), action) => {
  switch (action.type) {
    case LocalItemActions.TOGGLE_BEING_EDITED: {
      const existingFlags = state.get(action.payload.id);
      const newFlags = flag(existingFlags, action);

      return state.set(action.payload.id, newFlags);
    }

    case POST_ITEM_TO_SERVER.FAILURE: {
      const newFlags = flag(undefined, action);
      return state.set(action.payload.item.id, newFlags);
    }

    case POST_ITEM_TO_SERVER.SUCCESS: {
      const newFlags = flag(undefined, action);
      return state
        .delete(action.payload.id)
        .set(action.payload.item.id, newFlags);
    }

    case DELETE_ITEM_TO_SERVER:
    case PUT_ITEM_TO_SERVER.SUCCESS:
    case PUT_ITEM_TO_SERVER.FAILURE:
    case LocalItemActions.CREATE_ITEM: {
      const newFlags = flag(undefined, action);

      return state.set(action.payload.item.id, newFlags);
    }

    case LocalItemActions.DELETE_ITEM:
      return state.delete(action.payload.id);

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: ListItemData) => {
        state = state.set(item.id, new ListItemFlags());
      });

      return state;
    }

    default:
      return state;
  }
};
