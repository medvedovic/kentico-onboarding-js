import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, TOGGLE_BEING_EDITED } from '../constants/actionTypes';

export const createItem = (item) => ({
  type: CREATE_ITEM,
  payload: {
    item,
  },
});

export const updateItem = (guid, value) => ({
  type: UPDATE_ITEM,
  payload: {
    item: {
      guid,
      value,
    },
  },
});

export const deleteItem = (itemGuid) => ({
  type: DELETE_ITEM,
  payload: {
    itemGuid,
  },
});

export const toggleBeingEdited = (itemGuid) => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    itemGuid,
  },
});
