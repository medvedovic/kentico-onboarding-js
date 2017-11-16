import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';


interface IFetchDataThunkFactory {
  fetchOperation: (value: string, httpMethod: HttpAction) => Promise<Response>;
  fetchIsLoading: () => IAction;
  onFetchSucceeded: (items: Array<IServerItemDataModel>) => IAction;
  onFetchFailed: (error: Error) => IAction;
  apiEndpoint: string;
}

export const fetchDataThunkFactory = (dependencies: IFetchDataThunkFactory ) =>
  () =>
    (dispatch: Dispatch) => {
      dispatch(dependencies.fetchIsLoading());

      return dependencies.fetchOperation(dependencies.apiEndpoint, HttpAction.GET)
        .then((response) => response.json())
        .then((response) => {
          dispatch(dependencies.onFetchSucceeded(response));
        })
        .catch((response) => {
          dispatch(dependencies.onFetchFailed(response));
        });
    };
