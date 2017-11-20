import { Map } from 'immutable';

import {
  CREATE_ITEM,
  DELETE_ITEM,
  DELETE_ITEM_AT_SERVER_FAILURE,
  FETCH_DATA,
  POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER,
  TOGGLE_BEING_EDITED,
} from '../../../constants/actionTypes';
import { flag } from './flag';

import { Reducer } from '../../reducers';
import { ListItemFlags } from '../../../models/ListItemFlags';
import { ListItemData } from '../../../models/ListItemData';

export const flags: Reducer.Flags = (state = Map(), action) => {
  switch (action.type) {
    case TOGGLE_BEING_EDITED: {
      const existingFlags = state.get(action.payload.id);
      const newFlags = flag(existingFlags, action);

      return state.set(action.payload.id, newFlags);
    }

    case POST_ITEM_TO_SERVER.SUCCESS: {
      const newFlags = flag(undefined, action);
      return state
        .delete(action.payload.temporaryId)
        .set(action.payload.item.id, newFlags);
    }

    case PUT_ITEM_TO_SERVER.SUCCESS: {
      const newFlags = flag(undefined, action);
      return state
        .set(action.payload.item.id, newFlags);
    }

    case CREATE_ITEM:
    case POST_ITEM_TO_SERVER.FAILURE:
    case PUT_ITEM_TO_SERVER.FAILURE:
    case DELETE_ITEM_AT_SERVER_FAILURE: {
      const newFlags = flag(undefined, action);
      return state.set(action.payload.item.id, newFlags);
    }

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case FETCH_DATA.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: ListItemData) => {
        state = state.set(item.id, new ListItemFlags());
      });

      return state;
    }

    default:
      return state;
  }
};
