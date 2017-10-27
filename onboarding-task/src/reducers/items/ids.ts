import { List } from 'immutable';

import {
  FetchData,
  ItemActions,
  LocalItemActions,
} from '../../constants/actionTypes';

import { Reducer } from '../reducers';

export const ids: Reducer.Ids = (state = List<string>(), action) => {
  switch (action.type) {
    case LocalItemActions.CREATE_ITEM:
      return state.push(action.payload.item.id);

    case LocalItemActions.DELETE_ITEM:
      return state.filter(id => (
        id !== action.payload.id
      )).toList();

    case ItemActions.POST_ITEM_TO_SERVER: {
      return state.filter(id => (
        id !== action.payload.id
      )).toList().push(action.payload.item.id);
    }

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: any) => {
        state = state.push(item.id);
      });

      return state;
    }

    default:
      return state;
  }
};
