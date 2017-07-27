import { CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../constants/actionTypes';

export const createItem = (item) => ({
  type: CREATE_ITEM,
  item,
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
