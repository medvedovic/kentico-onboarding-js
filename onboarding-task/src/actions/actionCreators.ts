import { Dispatch } from 'react-redux';
import { CREATE_ITEM, } from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
import {
  fetchHasFailed,
  fetchHasSucceeded,
  fetchStartLoading,
  fetchStopLoading
} from './fetchActions';
import { deleteItem } from './userActions';
import {
  post,
  postAndSaveData,
  postDataActionFactory,
  postError,
  postSuccess
} from './postDataActionFactory';
import { fetchDataActionFactory } from './fetchDataActionFactory';
import {
  put,
  putDataActionFactory,
  putError,
  putSuccess
} from './putDataActionFactory';

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

export const putData = putDataActionFactory({
  putOperation: put,
  onPutSuccess: putSuccess,
  onPutError: putError
});
