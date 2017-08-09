import { CREATE_ITEM } from '../constants/actionTypes';

export const createItemBuilder = (factory) =>
  (value) => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });
