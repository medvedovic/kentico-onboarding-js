import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';
import { itemFactory } from '../utils/itemFactory';
import { generateGuid } from '../utils/generateGuid';

const createItemWithFactory = (factory, idGenerator) => (value) => ({
  type: CREATE_ITEM,
  payload: {
    item: factory(idGenerator)(value),
  },
});

export const createItem = createItemWithFactory(itemFactory, generateGuid);

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
