import 'isomorphic-fetch';
import {
  DELETE_ITEM,
  FETCH_DATA,
  TOGGLE_BEING_EDITED,
} from '../constants/actionTypes';
import {
  listItemDataConverter
} from '../utils/listItemDataConverter';
import { IAction } from './IAction';
import { IServerItemDataModel } from '../models/IServerItemDataModel';
import { ListItemData } from '../models/ListItemData';


export const fetchIsLoading = () => ({
  type: FETCH_DATA.IS_LOADING,
});

export const fetchHasFailed = (error: Error) => ({
  type: FETCH_DATA.HAS_FAILED,
  payload: {
    error,
  }
});

export const fetchHasSucceededBuilder = (factory: (value: string, id: string) => ListItemData) =>
  (items: Array<IServerItemDataModel>) => ({
    type: FETCH_DATA.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });

export const fetchHasSucceeded = fetchHasSucceededBuilder(listItemDataConverter);

export const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});

export const toggleBeingEdited = (id: string): IAction => ({
  type: TOGGLE_BEING_EDITED,
  payload: {
    id,
  },
});

