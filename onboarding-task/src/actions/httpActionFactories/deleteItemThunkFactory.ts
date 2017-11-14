import 'isomorphic-fetch';
import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';
import { handleErrorRequest } from './requestStatusActions';
import { DELETE_ITEM, DELETE_ITEM_AT_SERVER_FAILURE } from '../../constants/actionTypes';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { fetchBuilder } from './fetchBuilder';

interface IDeleteItemThunkFactoryDependencies {
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

export const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});

export const deleteData = deleteItemThunkFactory({
  operation: fetchBuilder(fetch),
  onError: handleErrorRequest(DELETE_ITEM_AT_SERVER_FAILURE),
  onSuccess: deleteItem,
  httpMethod: HttpAction.DELETE,
  apiEndpoint
});
