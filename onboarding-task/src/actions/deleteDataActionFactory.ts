import { Dispatch } from 'react-redux';
import { fetchActionBuilderComposed } from './fetchActions';
import { IAction } from './IAction';
import {
  EHttpActionStatus,
  HttpAction
} from '../constants/actionTypes';

const fetch = require('isomorphic-fetch');

interface IDeleteDataActionFactory {
  deleteOperation: (url: string, id: number) => Promise<Response>;
  onDeleteSuccess: (localId: string) => IAction;
  onDeleteError: (localId: string, response: Error) => IAction;
}

export const deleteHttp = (url: string, id: number) =>
  fetch(url + '/' + id, {
    method: HttpAction.DELETE,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response: Response) => {
      if (response.status === 500)
        throw new Error(response.statusText + ' at ' + response.url);
      return response;
    });

export const deleteError = fetchActionBuilderComposed(HttpAction.DELETE, EHttpActionStatus.error);

export const deleteDataActionFactory = (dependencies: IDeleteDataActionFactory) =>
  (url: string, localId: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const { id } = getState().items.data.get(localId);

      return dependencies.deleteOperation(url, id)
        .then(() =>
          dispatch(dependencies.onDeleteSuccess(localId)))
        .catch((response: Error) => {
          dispatch(dependencies.onDeleteError(localId, response));
        });
    };


