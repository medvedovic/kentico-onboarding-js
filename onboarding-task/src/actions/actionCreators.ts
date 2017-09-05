import { Dispatch } from 'react-redux';
import {
  CREATE_ITEM,
  EHttpActionStatus,
  HttpAction,
} from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
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
  deleteItem,
  updateItem
} from './userActions';
import {
  post,
  postAndSaveData,
  postDataActionFactory,
  postError,
  postSuccess
} from './postDataActionFactory';
import { fetchDataActionFactory } from './fetchDataActionFactory';

const fetch = require('isomorphic-fetch');

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const deleteData = (url: string, id: string) => {
  return (dispatch: Dispatch<any>) => {
    fetch(url + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => dispatch(deleteItem(id)))
      .catch((response: Error) => {
        dispatch(fetchHasFailed(response));
      });
  };
};

const put = (url: string, id: number, value: string) => {
  // create dto
  const itemDto = toItemDataDTO(value, id);
  // send request
  return fetch(url + '/' + id, {
    method: HttpAction.PUT,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemDto)
  });
};

export const updateData = (url: string, localId: string, value: string) =>
  (dispatch: Dispatch<any>, getState: any) => {
    const { id } = getState().items.data.get(localId);
    // update locally
    dispatch(updateItem(localId, value));

    put(url, id, value)
      .then((response: Response) => response.json())
      .then((response: IItemDataDTO) =>
        dispatch(
          fetchActionBuilder(
            HttpAction.PUT,
            EHttpActionStatus.success,
            localId,
            response
          )))
      .catch((response: Error) =>
        dispatch(
          fetchActionBuilder(
            HttpAction.PUT,
            EHttpActionStatus.error,
            localId,
            response.message
          )));
  };

export const postData = postDataActionFactory({
  postOperation: post,
  onPostSuccess: postSuccess,
  onPostError: postError
});

export const repostData = postAndSaveData({
  postOperation: post,
  onPostSuccess: postSuccess,
  onPostError: postError,
});

export const fetchData = fetchDataActionFactory({
  fetchOperation: fetch,
  startLoader: fetchStartLoading,
  stopLoader: fetchStopLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed
});
