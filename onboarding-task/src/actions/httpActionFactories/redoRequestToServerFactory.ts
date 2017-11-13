import { ListItemData } from '../../models/ListItemData';

import { IAction } from '../IAction';
import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { Store } from '../../reducers/stores';


export interface IRedoRequestToServerFactoryDependencies {
  operation: (_url: string, _itemDto?: IServerItemDataModel) => Promise<Response> & Promise<object>;
  transformDataToDto?: (item: ListItemData) => IServerItemDataModel;
  onSuccess: (_localId: string, _response?: IServerItemDataModel | Error) => IAction;
  onError: (_localId: string, _error: IServerItemDataModel | Error) => IAction;
  apiEndpoint: string;
}

export const redoRequestToServerFactory = (dependencies: IRedoRequestToServerFactoryDependencies) =>
    (localId: string) =>
      (dispatch: Dispatch, getState: () => Store.IRoot) => {
        const item = getState().items.data.get(localId);
        const itemDto = dependencies.transformDataToDto && dependencies.transformDataToDto(item);

        const url = item.id ? `${dependencies.apiEndpoint}/${item.id}` : dependencies.apiEndpoint;

        return dependencies.operation(url, itemDto)
          .then((response: IServerItemDataModel) =>
            dispatch(dependencies.onSuccess(localId, response)))
          .catch((error: Error) =>
            dispatch(dependencies.onError(localId, error)));
  };
