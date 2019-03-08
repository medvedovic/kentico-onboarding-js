import 'isomorphic-fetch';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  FETCH_DATA,
  TOGGLE_BEING_EDITED,
  UPDATE_ITEM,
} from '../constants/actionTypes';
import { IAction } from './IAction';
import { IServerItemUpdateModel } from '../models/IServerItemDataModel';
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

export const fetchHasSucceeded = (items: Array<IServerItemUpdateModel>) => ({
    type: FETCH_DATA.HAS_SUCCEEDED,
    payload: {
      items
    }
  });

export const createItem = (item: ListItemData): IAction => ({
  type: CREATE_ITEM,
    payload: {
      item,
    },
  });

export const updateItem = (id: string, value: string): IAction => ({
  type: UPDATE_ITEM,
  payload: {
    item: {
      id,
      value,
    },
  },
});

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

