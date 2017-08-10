import { CREATE_ITEM } from '../constants/actionTypes';
import {IAction, ItemPayload} from '../interfaces';

export const createItemBuilder = (factory: any) =>
  (value: string): IAction<ItemPayload> => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });
