import {
  CREATE_ITEM,
  FetchData
} from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const fetchHasFailed = (bool: boolean) => {
  return {
    type: FetchData.HAS_FAILED,
    hasErrored: bool
  };
};

export const fetchIsLoading = (bool: boolean) => {
  return {
    type: FetchData.IS_LOADING,
    isLoading: bool
  };
};

export const fetchHasSucceeded = (items: any) => {
  return {
    type: FetchData.HAS_SUCCEEDED,
    items
  };
};
