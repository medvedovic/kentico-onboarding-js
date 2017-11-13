import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataModel';

import { IAction } from '../IAction';
import { Store } from '../../reducers/stores';


interface IPutDataActionFactory {
  operation: (_url: string, _itemDto?: IServerItemDataModel) => Promise<Response>;
  updateItem: (localId: string, value: string) => IAction;
  onSuccess: (_localId: string, _response?: IServerItemDataModel | Error) => IAction;
  onError: (_localId: string, _error: IServerItemDataModel | Error) => IAction;
  apiEndpoint: string;
}

export const putDataActionFactory = (dependencies: IPutDataActionFactory) =>
  (id: string, value: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      dispatch(dependencies.updateItem(id, value));

      const item = getState().items.data.get(id);
      const itemDto = toServerItemDataViewModel(item);

      const url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.operation(url, itemDto)
        .then((response: Response) => response.json())
        .then((response: IServerItemDataModel) =>
          dispatch(dependencies.onSuccess(id, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onError(id, response)));
    };
