import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataModel';

import { IAction } from '../IAction';
import { Store } from '../../reducers/stores';
import { HttpAction } from '../../constants/HttpAction';


interface IPutDataThunkFactory {
  operation: (_url: string, httpMethod: HttpAction, _itemDto?: IServerItemDataModel) => Promise<Response>;
  updateItem: (localId: string, value: string) => IAction;
  onSuccess: (_localId: string, _response?: IServerItemDataModel) => IAction;
  onError: (_localId: string, _error: Error) => IAction;
  httpMethod: HttpAction;
  apiEndpoint: string;
}

export const putDataThunkFactory = (dependencies: IPutDataThunkFactory) =>
  (id: string, value: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      dispatch(dependencies.updateItem(id, value));

      const item = getState().items.data.get(id);
      const itemDto = toServerItemDataViewModel(item);

      const url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.operation(url, dependencies.httpMethod, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(id, response)))
        .catch((response) =>
          dispatch(dependencies.onError(id, response)));
    };
