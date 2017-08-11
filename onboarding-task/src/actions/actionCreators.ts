import { CREATE_ITEM } from '../constants/actionTypes';
import { IAction, ItemPayload } from '../interfaces';
import { itemFactoryWithGenerator } from '../utils/itemFactory';

export const createItemBuilder = (factory: itemFactoryWithGenerator) =>
  (value: string): IAction<ItemPayload> => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });
