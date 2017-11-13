import 'isomorphic-fetch';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  FETCH_DATA,
  TOGGLE_BEING_EDITED,
  UPDATE_ITEM,
} from '../constants/actionTypes';
import {
  IListItemDataConverterWithGenerator,
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

export const createItemBuilder = (factory: IListItemDataConverterWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const createItem = createItemBuilder(listItemDataConverter);

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

