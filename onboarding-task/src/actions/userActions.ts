import {
  UPDATE_ITEM,
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';

import { IAction } from './IAction';

export const updateItem = (id: string, value: string): IAction => ({
  type: UPDATE_ITEM,
  payload: {
    item: {
      id,
      value,
    },
  },
});

export const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});

export const toggleBeingEdited = (localId: string): IAction => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    localId,
  },
});
