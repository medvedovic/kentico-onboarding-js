import {
  CREATE_ITEM,
  HttpAction,
  HttpActionStatus
} from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
import { Dispatch } from 'react-redux';
import { toItemDataDTO } from '../models/ItemDataDTO';
import {
  fetchActionBuilder,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchStartLoading,
  fetchStopLoading
} from './fetchActions';
import {
  deleteItem,
} from './publicActions';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const fetchData = (url: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStartLoading());

    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(response => {
          dispatch(fetchHasSucceeded(response));
          dispatch(fetchStopLoading());
        })
        .catch(response => {
          dispatch(fetchStopLoading());
          dispatch(fetchHasFailed(response.message));
        });
    },         3000);
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
    }).then(response => response.json())
      .then((response) =>
        dispatch(fetchActionBuilder(HttpAction.PUT, HttpActionStatus.SUCCESS, response)))
      .catch(response =>
        dispatch(fetchActionBuilder(HttpAction.PUT, HttpActionStatus.ERROR, response.message)));
  };
};


export const postData = (url: string, value: string) => {
  return (dispatch: Dispatch<any>) => {
    const itemDto = toItemDataDTO(value);

    fetch(url, {
      method: HttpAction.POST,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemDto)
    }).then(response => response.json())
      .then((response) =>
        dispatch(fetchActionBuilder(HttpAction.POST, HttpActionStatus.SUCCESS, response)))
      .catch((response) =>
        dispatch(fetchActionBuilder(HttpAction.POST, HttpActionStatus.ERROR, response.message)));
  };
};
