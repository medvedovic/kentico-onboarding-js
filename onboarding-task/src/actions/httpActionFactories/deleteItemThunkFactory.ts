import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';

interface IDeleteItemThunkFactoryDependencies {
  operation: (url: string, httpMethod: HttpAction) => Promise<Response>;
  onSuccess: (_itemId: string, _response: Response) => IAction;
  onError: (_itemId: string, _error: Error) => IAction;
  apiEndpoint: string;
}

export const deleteItemThunkFactory = (dependencies: IDeleteItemThunkFactoryDependencies) =>
  (itemId: string) =>
    (dispatch: Dispatch) => {
      const url = `${dependencies.apiEndpoint}/${itemId}`;

      return dependencies.operation(url, HttpAction.DELETE)
        .then((response) =>
          dispatch(dependencies.onSuccess(itemId, response)))
        .catch((error) =>
          dispatch(dependencies.onError(itemId, error)));
    };
