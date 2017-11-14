import { ListItemData } from '../../models/ListItemData';

import { IAction } from '../IAction';
import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { Store } from '../../reducers/stores';
import { HttpAction } from '../../constants/HttpAction';


export interface IRedoRequestToServerFactoryDependencies {
  operation: (_url: string, httpMethod: HttpAction, _itemDto?: IServerItemDataModel) => Promise<Response>;
  transformDataToDto: (item: ListItemData) => IServerItemDataModel;
  onSuccess: (_response: IServerItemDataModel) => IAction;
  onError: (_localId: string, _error: Error) => IAction;
  httpMethod: HttpAction,
  apiEndpoint: string;
}

export const redoRequestToServerFactory = (dependencies: IRedoRequestToServerFactoryDependencies) =>
    (localId: string) =>
      (dispatch: Dispatch, getState: () => Store.IRoot) => {
        const item = getState().items.data.get(localId);
        const itemDto = dependencies.transformDataToDto(item);
        let url = `${dependencies.apiEndpoint}/${item.id}`;

        return dependencies.operation(url, dependencies.httpMethod, itemDto)
          .then((response) => response.json())
          .then((response) =>
            dispatch(dependencies.onSuccess(response)))
          .catch((error) =>
            dispatch(dependencies.onError(localId, error)));
  };


