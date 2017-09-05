import {
  EHttpActionStatus,
  FetchData
} from '../constants/actionTypes';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';
import { ListItemData } from '../models/ListItemData';
import { itemFactory } from '../utils/itemFactory';

export const fetchHasFailed = (error: Error) => ({
  type: FetchData.HAS_FAILED,
  payload: {
    error,
  }
});

const fetchIsLoading = (bool: boolean) => ({
  type: FetchData.IS_LOADING,
  payload: {
    isLoading: bool
  }
});

export const fetchStartLoading = () => fetchIsLoading(true);
export const fetchStopLoading = () => fetchIsLoading(false);

export const fetchHasSucceededBuilder = (factory: (value: string, id: number) => ListItemData) =>
  (items: Array<IItemDataDTO>) => ({
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });

export const fetchHasSucceeded = fetchHasSucceededBuilder(itemFactory);

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

interface IFetchActionBuilder {
  (localId: string, params: IItemDataDTO | Error): IAction;
}

export const fetchActionBuilderComposed = (type: string, status: EHttpActionStatus): IFetchActionBuilder => {
  return status === EHttpActionStatus.success ?
    (localId: string, params: IItemDataDTO) => ({
      type,
      status,
      payload: {
        item: new ListItemData({
          id: params.id,
          value: params.value,
          localId,
        })
      }
    })
    :
    (localId: string, params: Error) => ({
      type,
      status,
      payload: {
        error: params,
        item: {
          localId
        }
      }
    });
};
