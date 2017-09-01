import { CREATE_ITEM } from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
import { Dispatch } from 'react-redux';
import { toItemDataDTO } from '../models/ItemDataDTO';
import { createItem } from './publicActions';
import {
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading
} from './fetchActions';
import {
  deleteItem,
  updateItem
} from './userActions';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const fetchData = (url: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchIsLoading(true));

    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(response => {
          dispatch(fetchHasSucceeded(response));
          dispatch(fetchIsLoading(false));
        })
        .catch(response => {
          dispatch(fetchIsLoading(false));
          dispatch(fetchHasFailed(response.message));
        });
    },         3000);
  };
};

export const postData = (url: string, value: string) => {
  return (dispatch: Dispatch<any>) => {
    const itemDto = toItemDataDTO(value);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemDto)
    }).then(response => response.json())
      .then(() => dispatch(createItem(value)));
  };
};

export const deleteData = (url: string, id: string) => {
  return (dispatch: Dispatch<any>) => {
    fetch(url + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => dispatch(deleteItem(id)))
      .catch(response => {
        dispatch(fetchIsLoading(false));
        dispatch(fetchHasFailed(response.message));
      });
  };
};

export const updateData = (url: string, id: string, value: string) => {
  return (dispatch: Dispatch<any>) => {
    const itemDto = toItemDataDTO(value);

    fetch(url + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemDto)
    }).then(() => dispatch(updateItem(id, value)))
      .catch(response => dispatch(fetchHasFailed(response.message)));
  };
};
