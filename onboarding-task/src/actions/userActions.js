import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from './actionTypes';

export const createItem = (item) => ({
  type: CREATE_ITEM,
  item,
});

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  item,
});

export const deleteItem = (itemGuid) => ({
  type: DELETE_ITEM,
  itemGuid,
});
