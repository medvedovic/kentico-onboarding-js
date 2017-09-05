import { Dispatch } from 'react-redux';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../models/ItemDataDTO';
import {
  EHttpActionStatus,
  HttpAction
} from '../constants/actionTypes';
import { createItem } from './publicActions';
import { fetchActionBuilderComposed } from './fetchActions';
import { IAction } from './IAction';

interface IPostDataActionFactoryDependencies {
  postOperation: (url: string, value: string) => Promise<Response>;
  onPostSuccess: (localId: string, response: IItemDataDTO) => IAction;
  onPostError: (localId: string, response: Error) => IAction;
}

export const postSuccess = fetchActionBuilderComposed(HttpAction.POST, EHttpActionStatus.success);
export const postError = fetchActionBuilderComposed(HttpAction.POST, EHttpActionStatus.error);

export const post = (url: string, value: string) => {
  const itemDto = toItemDataDTO(value);

  return fetch(url, {
    method: HttpAction.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemDto)
  });
};

export const postAndSaveData = (dependencies: IPostDataActionFactoryDependencies) =>
  (url: string, localId: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const item = getState().items.data.get(localId);

      dependencies.postOperation(url, item.value)
        .then(response => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPostSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPostError(localId, response)));
    };

export const postDataActionFactory = (dependencies: IPostDataActionFactoryDependencies) =>
  (url: string, value: string) =>
    (dispatch: Dispatch<any>) => {
      const { payload: { item: { localId } } } = dispatch(createItem(value));

      dependencies.postOperation(url, value)
        .then((response) => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPostSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPostError(localId, response)));
    };


