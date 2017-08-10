import {
  UPDATE_ITEM,
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';
import { IAction, IdPayload, ItemPayload } from '../interfaces';

export const updateItem = (id: string, value: string): IAction<ItemPayload> => ({
  type: UPDATE_ITEM,
  payload: {
    item: {
      id,
      value,
    },
  },
});

export const deleteItem = (id: string): IAction<IdPayload> => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});

export const toggleBeingEdited = (id: string): IAction<IdPayload> => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    id,
  },
});
