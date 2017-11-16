import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';


interface IFetchDataThunkFactory {
  readonly fetchOperation: (value: string, httpMethod: HttpAction) => Promise<Response>;
  readonly fetchIsLoading: () => IAction;
  readonly onFetchSucceeded: (items: Array<IServerItemDataModel>) => IAction;
  readonly onFetchFailed: (error: Error) => IAction;
  readonly apiEndpoint: string;
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
