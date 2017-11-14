import { IAction } from '../IAction';

interface IDeleteItemThunkFactoryDependencies {
  operation: (url: string) => Promise<Response>;
  onSuccess: (_itemId: string, _response: Response) => IAction;
  onError: (_itemId: string, _error: Error) => IAction;
  apiEndpoint: string;
}

export const deleteItemThunkFactory = (dependencies: IDeleteItemThunkFactoryDependencies) =>
  (itemId: string) =>
    (dispatch: Dispatch) => {
      const url = `${dependencies.apiEndpoint}/${itemId}`;

      return dependencies.operation(url)
        .then((response) =>
          dispatch(dependencies.onSuccess(itemId, response)))
        .catch((error) =>
          dispatch(dependencies.onError(itemId, error)));
    };
