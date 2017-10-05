import { Dispatch } from 'react-redux';
import { IAction } from './IAction';
import { Store } from '../reducers/stores';

interface IDeleteDataActionFactory {
  deleteOperation: (url: string, id: string) => Promise<Response>;
  onDeleteSuccess: (localId: string) => IAction;
  onDeleteError: (localId: string, response: Error) => IAction;
  apiEndpoint: string;
}

export const deleteDataActionFactory = (dependencies: IDeleteDataActionFactory) =>
  (localId: string) =>
    (dispatch: Dispatch<any>, getState: () => Store.IRoot) => {
      const { id } = getState().items.data.get(localId);

      const url = `${dependencies.apiEndpoint}/${id}`;

      return dependencies.deleteOperation(url, id)
        .then(() =>
          dispatch(dependencies.onDeleteSuccess(localId)))
        .catch((response: Error) => {
          dispatch(dependencies.onDeleteError(localId, response));
        });
    };


