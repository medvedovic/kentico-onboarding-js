/**
 * Item manipulation
 */
const CREATE_ITEM = 'CREATE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

/**
 * Action creators
 */
export const createItem = (item) => ({
  type: CREATE_ITEM,
  item,
});

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  item,
});

export const deleteItem = (item) => ({
  type: DELETE_ITEM,
  item,
});
