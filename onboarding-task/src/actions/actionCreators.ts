import { CREATE_ITEM } from '../constants/actionTypes';
import { IAction, ItemPayload } from '../interfaces';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction<ItemPayload> =>
  (value: string): IAction<ItemPayload> => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });
