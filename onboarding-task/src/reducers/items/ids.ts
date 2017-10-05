import { List } from 'immutable';

import {
  FetchData,
  LocalItemActions,
} from '../../constants/actionTypes';

import { Reducer } from '../reducers';

export const ids: Reducer.Ids = (state = List<string>(), action) => {
  switch (action.type) {
    case LocalItemActions.CREATE_ITEM:
      return state.push(action.payload.item.localId);

    case LocalItemActions.DELETE_ITEM:
      return state.filter(id => (
        id !== action.payload.id
      )).toList();

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: any) => {
        state = state.push(item.localId);
      });

      return state;
    }

    default:
      return state;
  }
};
