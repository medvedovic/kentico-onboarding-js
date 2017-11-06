import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';

interface IFetchDataActionFactory {
  fetchOperation: (value: string) => Promise<object>;
  startLoader: () => IAction;
  onFetchSucceeded: (items: Array<IServerItemDataModel>) => IAction;
  onFetchFailed: (error: Error) => IAction;
  apiEndpoint: string;
}

export const fetchDataActionFactory = (dependencies: IFetchDataActionFactory ) =>
  () =>
    (dispatch: Dispatch) => {
      dispatch(dependencies.startLoader());

      return dependencies.fetchOperation(dependencies.apiEndpoint)
        .then((response: Array<IServerItemDataModel>) => {
          dispatch(dependencies.onFetchSucceeded(response));
        })
        .catch((response: Error) => {
          dispatch(dependencies.onFetchFailed(response));
        });
    };


