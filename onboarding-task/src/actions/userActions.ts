import {
  LocalItemActions,
} from '../constants/actionTypes';

import { IAction } from './IAction';

export const updateItem = (localId: string, value: string): IAction => ({
  type: LocalItemActions.UPDATE_ITEM,
  payload: {
    item: {
      localId,
      value,
    },
  },
});

export const deleteItem = (id: string): IAction => ({
  type: LocalItemActions.DELETE_ITEM,
  payload: {
    id,
  },
});

export const toggleBeingEdited = (localId: string): IAction => ({
  type: LocalItemActions.TOGGLE_BEING_EDITED,
  payload: {
    localId,
  },
});
