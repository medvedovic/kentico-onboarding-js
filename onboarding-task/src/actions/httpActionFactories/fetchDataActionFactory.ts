import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';

interface IFetchDataActionFactory {
  fetchOperation: (value: string) => Promise<Response>;
  fetchIsLoading: () => IAction;
  onFetchSucceeded: (items: Array<IServerItemDataModel>) => IAction;
  onFetchFailed: (error: Error) => IAction;
  apiEndpoint: string;
}

export const fetchDataActionFactory = (dependencies: IFetchDataActionFactory ) =>
  () =>
    (dispatch: Dispatch) => {
      dispatch(dependencies.fetchIsLoading());

      return dependencies.fetchOperation(dependencies.apiEndpoint)
        .then((response) => response.json())
        .then((response) => {
          dispatch(dependencies.onFetchSucceeded(response));
        })
        .catch((response) => {
          dispatch(dependencies.onFetchFailed(response));
        });
    };


