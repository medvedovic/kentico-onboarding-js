import {
  CREATE_ITEM,
  EHttpActionStatus,
  HttpAction,
} from '../constants/actionTypes';
import {
  IItemFactoryWithGenerator,
  itemFactory
} from '../utils/itemFactory';

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
import { deleteItem, } from './publicActions';
import { updateItem } from './userActions';
import {
  post,
  postAndSaveData,
  postDataActionFactory,
  postError,
  postSuccess
} from './postDataActionFactory';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const fetchData = (url: string) =>
  (dispatch: Dispatch<any>) => {
    dispatch(fetchStartLoading());

    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then((response: Array<IItemDataDTO>) => {
          response = response.map((item: IItemDataDTO) =>
            itemFactory(item.value, item.id)
          );
          dispatch(fetchHasSucceeded(response));
          dispatch(fetchStopLoading());
        })
        .catch((response: Error) => {
          dispatch(fetchStopLoading());
          dispatch(fetchHasFailed(response.message));
        });
    },         3000);
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
      .then(response => response.json())
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
