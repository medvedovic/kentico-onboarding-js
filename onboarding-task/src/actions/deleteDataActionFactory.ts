import { Dispatch } from 'react-redux';
import { deleteItem } from './userActions';
import { fetchActionBuilderComposed } from './fetchActions';
import { IAction } from './IAction';
import {
  EHttpActionStatus,
  HttpAction
} from '../constants/actionTypes';

const fetch = require('isomorphic-fetch');

interface IDeleteDataActionFactory {
  deleteOperation: (url: string, id: number) => Promise<Response>;
  onDeleteError: (localId: string, response: Error) => IAction;
}

export const deleteHttp = (url: string, id: number) =>
  fetch(url + '/' + id, {
    method: HttpAction.DELETE,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const deleteError = fetchActionBuilderComposed(HttpAction.DELETE, EHttpActionStatus.error);

export const deleteDataActionFactory = (dependencies: IDeleteDataActionFactory) =>
  (url: string, localId: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const { id } = getState().items.data.get(localId);

      dependencies.deleteOperation(url, id)
        .then(() => dispatch(deleteItem(localId)))
        .catch((response: Error) =>
          dispatch(dependencies.onDeleteError(localId, response)));
    };


