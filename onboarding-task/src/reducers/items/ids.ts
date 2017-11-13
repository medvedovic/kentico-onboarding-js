import { List } from 'immutable';
import { Reducer } from '../reducers';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  FETCH_DATA,
  POST_ITEM_TO_SERVER
} from '../../constants/actionTypes';

export const ids: Reducer.Ids = (state = List<string>(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return state.push(action.payload.item.id);

    case DELETE_ITEM:
      return state.filter(id => (
        id !== action.payload.id
      )).toList();

    case POST_ITEM_TO_SERVER.SUCCESS:
      return state.filter(id => (
        id !== action.payload.id
      )).toList().push(action.payload.item.id);

    case FETCH_DATA.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: any) => {
        state = state.push(item.id);
      });

      return state;
    }

    default:
      return state;
  }
};
