import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../constants/actionTypes';

export const createItem = (value) => ({
  type: CREATE_ITEM,
  value,
});

export const updateItem = (guid, value) => ({
  type: UPDATE_ITEM,
  item: {
    guid,
    value,
  },
});

export const deleteItem = (itemGuid) => ({
  type: DELETE_ITEM,
  itemGuid,
});
