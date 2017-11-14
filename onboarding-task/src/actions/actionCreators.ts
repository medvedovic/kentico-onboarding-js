import {
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';
import { IAction } from './IAction';

export const toggleBeingEdited = (id: string): IAction => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    id,
  },
});

