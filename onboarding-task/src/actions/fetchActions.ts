import {
  EHttpActionStatus,
  FetchData
} from '../constants/actionTypes';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';
import { ListItemData } from '../models/ListItemData';

export const fetchIsLoading = (bool: boolean) =>
  () => ({
    type: FetchData.IS_LOADING,
    payload: {
      isLoading: bool
    }
  });

export const fetchHasFailed = (error: Error) => ({
  type: FetchData.HAS_FAILED,
  payload: {
    error,
  }
});

export const fetchHasSucceededBuilder = (factory: (value: string, id: number) => ListItemData) =>
  (items: Array<IItemDataDTO>) => ({
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });

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
