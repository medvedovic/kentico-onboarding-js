import { ListItemData } from '../../models/ListItemData';

import { IAction } from '../IAction';
import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { Store } from '../../reducers/stores';


export interface IRedoRequestToServerFactoryDependencies {
  operation: (_url: string, _itemDto?: IServerItemDataModel) => Promise<Response>;
  transformDataToDto: (item: ListItemData) => IServerItemDataModel;
  onSuccess: (_localId: string, _response?: IServerItemDataModel) => IAction;
  onError: (_localId: string, _error: Error) => IAction;
  apiEndpoint: string;
}

export const redoRequestToServerFactory = (dependencies: IRedoRequestToServerFactoryDependencies) =>
    (localId: string) =>
      (dispatch: Dispatch, getState: () => Store.IRoot) => {
        const item = getState().items.data.get(localId);
        const itemDto = dependencies.transformDataToDto(item);
        const url = `${dependencies.apiEndpoint}/${item.id}`;

        return dependencies.operation(url, itemDto)
          .then((response) => response.json())
          .then((response) =>
            dispatch(dependencies.onSuccess(localId, response)))
          .catch((error) =>
            dispatch(dependencies.onError(localId, error)));
  };
