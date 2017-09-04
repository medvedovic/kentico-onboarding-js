import { FetchData } from '../constants/actionTypes';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';
import { ListItemData } from '../models/ListItemData';

export const fetchHasFailed = (errorMessage: string) => {
  return {
    type: FetchData.HAS_FAILED,
    payload: {
      errorMessage,
    }
  };
};

export const fetchIsLoading = (bool: boolean) => {
  return {
    type: FetchData.IS_LOADING,
    payload: {
      isLoading: bool
    }
  };
};

export const fetchHasSucceeded = (items: any) => {
  return {
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items
    }
  };
};

export function fetchActionBuilder(type: string, status: string, params: IItemDataDTO): IAction;
export function fetchActionBuilder(type: string, status: string, params: string): IAction;
export function fetchActionBuilder(type: string, status: string, params: IItemDataDTO | string) {
  return typeof params === 'string' ?
    {
      type,
      status,
      payload: {
        error: params
      }
    }
    :
    {
      type,
      status,
      payload: {
        item: new ListItemData({
          id: (params.id === undefined) ? '0' : params.id.toString(),
          value: params.value,
        })
      }
    };
}
