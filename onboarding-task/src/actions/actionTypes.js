/**
 * Item manipulation
 */
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

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
