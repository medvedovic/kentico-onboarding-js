import {
  CREATE_ITEM,
  EHttpActionStatus,
  HttpAction,
} from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
import { Dispatch } from 'react-redux';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../models/ItemDataDTO';
import {
  fetchActionBuilder,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchStartLoading,
  fetchStopLoading
} from './fetchActions';
import {
  createItem,
  deleteItem,
} from './publicActions';
import { generateGuid } from '../utils/generateGuid';

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
    const localId = generateGuid();

    fetch(url + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemDto)
    }).then(response => response.json())
      .then((response: IItemDataDTO) =>
        dispatch(fetchActionBuilder(HttpAction.PUT, EHttpActionStatus.success, localId, response)))
      .catch((response: Error) =>
        dispatch(fetchActionBuilder(HttpAction.PUT, EHttpActionStatus.error, localId, response.message)));
  };
};

const post = (url: string, value: string) => {
  // create item dto
  const itemDto = toItemDataDTO(value);
  // send item to server via fetch
  return fetch(url, {
    method: HttpAction.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemDto)
  });
};

export const postData = (url: string, value: string) => {
  return (dispatch: Dispatch<any>) => {
    // creates new item locally
    const { payload: { item: { localId } } } = dispatch(createItem(value));

    post(url, value)
      .then(response => response.json())
      .then((response: IItemDataDTO) =>
        dispatch(
          fetchActionBuilder(
            HttpAction.POST,
            EHttpActionStatus.success,
            localId,
            response
          )))
      .catch((response: Error) =>
        dispatch(
          fetchActionBuilder(
            HttpAction.POST,
            EHttpActionStatus.error,
            localId,
            response.message
          )));
  };
};

