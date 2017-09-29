import { Dispatch } from 'react-redux';
import { fetchActionBuilderComposed } from './fetchActions';
import { IAction } from './IAction';
import {
  EHttpActionStatus,
  HttpAction
} from '../constants/actionTypes';
import { Store } from '../reducers/stores';

interface IDeleteDataActionFactory {
  deleteOperation: (url: string, id: string) => Promise<Response>;
  onDeleteSuccess: (localId: string) => IAction;
  onDeleteError: (localId: string, response: Error) => IAction;
}

export const deleteError = fetchActionBuilderComposed(HttpAction.DELETE, EHttpActionStatus.error);

export const deleteDataActionFactory = (dependencies: IDeleteDataActionFactory) =>
  (url: string, localId: string) =>
    (dispatch: Dispatch<any>, getState: () => Store.IRoot) => {
      const { id } = getState().items.data.get(localId);

      return dependencies.deleteOperation(url, id)
        .then(() =>
          dispatch(dependencies.onDeleteSuccess(localId)))
        .catch((response: Error) => {
          dispatch(dependencies.onDeleteError(localId, response));
        });
    };


