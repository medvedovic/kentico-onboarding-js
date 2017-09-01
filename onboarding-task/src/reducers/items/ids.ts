import { List } from 'immutable';

import {
  CREATE_ITEM,
  DELETE_ITEM,
  FetchData,
  HttpAction,
} from '../../constants/actionTypes';

import { Reducer } from '../reducers';

export const ids: Reducer.Ids = (state = List<string>(), action) => {
  switch (action.type) {
    case HttpAction.POST:
    case CREATE_ITEM:
      return state.push(action.payload.item.id);

    case DELETE_ITEM:
      return state.filter(id => (
        id !== action.payload.id
      )).toList();

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: any) => {
        state = state.push(item.Id.toString());
      });

      return state;
    }

    default:
      return state;
  }
};
