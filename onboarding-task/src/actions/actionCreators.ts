import { CREATE_ITEM } from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from '../interfaces';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });
