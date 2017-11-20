import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';


interface IDeleteItemThunkFactoryDependencies {
  readonly sendRequest: (url: string, httpMethod: HttpAction) => Promise<Response>;
  readonly onSuccess: (_itemId: string, _response: Response) => IAction;
  readonly onError: (_itemId: string, _error: Error) => IAction;
  readonly apiEndpoint: string;
}

export const deleteItemThunkFactory = (dependencies: IDeleteItemThunkFactoryDependencies) =>
  (itemId: string) =>
    (dispatch: Dispatch) => {
      const url = `${dependencies.apiEndpoint}/${itemId}`;

      return dependencies.sendRequest(url, HttpAction.DELETE)
        .then((response) =>
          dispatch(dependencies.onSuccess(itemId, response)))
        .catch((error) =>
          dispatch(dependencies.onError(itemId, error)));
    };
