import {
  UPDATE_ITEM,
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';

export const updateItem = (id, value) => ({
  type: UPDATE_ITEM,
  payload: {
    item: {
      id,
      value,
    },
  },
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: {
    itemId,
  },
});

export const toggleBeingEdited = (itemId) => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    itemId,
  },
});
