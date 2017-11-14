import 'isomorphic-fetch';
import {
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';
import { IAction } from './IAction';

export const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});

export const toggleBeingEdited = (id: string): IAction => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    id,
  },
});

