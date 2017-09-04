import {
  EHttpActionStatus,
  FetchData
} from '../constants/actionTypes';
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

const fetchIsLoading = (bool: boolean) => {
  return {
    type: FetchData.IS_LOADING,
    payload: {
      isLoading: bool
    }
  };
};

export const fetchStartLoading = () => fetchIsLoading(true);
export const fetchStopLoading = () => fetchIsLoading(false);

export const fetchHasSucceeded = (items: Array<IItemDataDTO>) => {
  return {
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items
    }
  };
};

export function fetchActionBuilder(type: string, status: EHttpActionStatus, localId: string, params: IItemDataDTO): IAction;
export function fetchActionBuilder(type: string, status: EHttpActionStatus, localId: string, params: string): IAction;
export function fetchActionBuilder(type: string, status: EHttpActionStatus, localId: string, params: IItemDataDTO | string) {
  return typeof params === 'string' ?
    {
      type,
      status,
      payload: {
        error: params,
        item: {
          localId
        }
      }
    }
    :
    {
      type,
      status,
      payload: {
        item: new ListItemData({
          id: params.id,
          value: params.value,
          localId,
        })
      }
    };
}
