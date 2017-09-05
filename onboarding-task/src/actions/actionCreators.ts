import { CREATE_ITEM, } from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
import {
  fetchHasFailed,
  fetchHasSucceeded,
  fetchStartLoading,
  fetchStopLoading
} from './fetchActions';
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
import {
  deleteDataActionFactory,
  deleteError,
  deleteHttp
} from './deleteDataActionFactory';

const fetch = require('isomorphic-fetch');

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

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

export const deleteData = deleteDataActionFactory({
  deleteOperation: deleteHttp,
  onDeleteError: deleteError
});
