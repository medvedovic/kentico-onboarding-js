import { FetchData } from '../../constants/actionTypes';
import { IItemDataDTO } from '../../models/ItemDataDTO';
import { ListItemData } from '../../models/ListItemData';

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

export const fetchHasSucceededBuilder = (factory: (value: string, id: string) => ListItemData) =>
  (items: Array<IItemDataDTO>) => ({
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });
