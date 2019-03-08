import { IServerItemUpdateModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { Store } from '../../reducers/stores';
import { HttpAction } from '../../constants/HttpAction';
import { ListItemData } from '../../models/ListItemData';


export interface IReputItemThunkFactory {
  readonly sendRequest: (_url: string, httpMethod: HttpAction, _itemDto?: IServerItemUpdateModel) => Promise<Response>;
  readonly transformDataToDto: (item: ListItemData) => IServerItemUpdateModel;
  readonly onSuccess: (_response: IServerItemUpdateModel) => IAction;
  readonly onError: (_localId: string, _error: Error) => IAction;
  readonly apiEndpoint: string;
}

interface IPutDataThunkFactory extends IReputItemThunkFactory {
  readonly updateItem: (localId: string, value: string) => IAction;
}

export const putDataThunkFactory = (dependencies: IPutDataThunkFactory) =>
  (id: string, value: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      dispatch(dependencies.updateItem(id, value));

      const item = getState().items.data.get(id);
      if (!item) {
        throw new Error('Such item does not exist');
      }
      const itemDto = dependencies.transformDataToDto(item);

      const url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.sendRequest(url, HttpAction.PUT, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(response)))
        .catch((response) =>
          dispatch(dependencies.onError(id, response)));
    };

export const reputItemThunkFactory = (dependencies: IReputItemThunkFactory) =>
  (localId: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      const item = getState().items.data.get(localId);
      if (!item) {
        throw new Error('Such item does not exist');
      }

      const itemDto = dependencies.transformDataToDto(item);
      let url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.sendRequest(url, HttpAction.PUT, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(response)))
        .catch((error) =>
          dispatch(dependencies.onError(localId, error)));
    };
