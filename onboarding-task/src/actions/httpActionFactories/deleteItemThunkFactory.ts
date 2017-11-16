import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';

export interface IDeleteItemThunkFactoryDependencies {
  operation: (url: string, httpMethod: HttpAction) => Promise<Response>;
  onSuccess: (_itemId: string, _response: Response) => IAction;
  onError: (_itemId: string, _error: Error) => IAction;
  httpMethod: HttpAction;
  apiEndpoint: string;
}

export const deleteItemThunkFactory = (dependencies: IDeleteItemThunkFactoryDependencies) =>
  (itemId: string) =>
    (dispatch: Dispatch) => {
      const url = `${dependencies.apiEndpoint}/${itemId}`;

      return dependencies.operation(url, dependencies.httpMethod)
        .then((response) =>
          dispatch(dependencies.onSuccess(itemId, response)))
        .catch((error) =>
          dispatch(dependencies.onError(itemId, error)));
    };
