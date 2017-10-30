import { IServerItemDataViewModel } from '../../models/IServerItemDataViewModel';
import { IAction } from '../IAction';
import { Dispatch } from '../../Dispatch';

interface IFetchDataActionFactory {
  fetchOperation: (value: string) => Promise<Response>;
  startLoader: () => IAction;
  onFetchSucceeded: (items: Array<IServerItemDataViewModel>) => IAction;
  onFetchFailed: (error: Error) => IAction;
  apiEndpoint: string;
}

export const fetchDataActionFactory = (dependencies: IFetchDataActionFactory ) =>
  () =>
    (dispatch: Dispatch) => {
      dispatch(dependencies.startLoader());

      return dependencies.fetchOperation(dependencies.apiEndpoint)
        .then(response => response.json())
        .then((response: Array<IServerItemDataViewModel>) => {
          dispatch(dependencies.onFetchSucceeded(response));
        })
        .catch((response: Error) => {
          dispatch(dependencies.onFetchFailed(response));
        });
    };


