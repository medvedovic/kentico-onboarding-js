import { Dispatch } from 'react-redux';
import { updateItem } from './userActions';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../models/ItemDataDTO';
import { fetchActionBuilderComposed } from './fetchActions';
import {
  EHttpActionStatus,
  HttpAction
} from '../constants/actionTypes';
import { IAction } from './IAction';

const fetch = require('isomorphic-fetch');

interface IPutDataActionFactory {
  putOperation: (url: string, id: number, value: string) => Promise<Response>;
  onPutSuccess: (localId: string, response: IItemDataDTO) => IAction;
  onPutError: (localId: string, response: Error) => IAction;
}

export const putSuccess = fetchActionBuilderComposed(HttpAction.PUT, EHttpActionStatus.success);
export const putError = fetchActionBuilderComposed(HttpAction.PUT, EHttpActionStatus.error);

export const put = (url: string, id: number, value: string) => {
  const itemDto = toItemDataDTO(value, id);

  return fetch(url + '/' + id, {
    method: HttpAction.PUT,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemDto)
  });
};

export const putDataActionFactory = (dependencies: IPutDataActionFactory) =>
  (url: string, localId: string, value: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const { id } = getState().items.data.get(localId);
      dispatch(updateItem(localId, value));

      dependencies.putOperation(url, id, value)
        .then((response: Response) => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPutSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPutError(localId, response)));
    };
