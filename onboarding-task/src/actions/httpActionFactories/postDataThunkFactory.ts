import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';
import { HttpAction } from '../../constants/HttpAction';
import { Store } from '../../reducers/stores';


export interface IRepostRequestThunkFactory {
  readonly postItem: (_url: string, httpMethod: HttpAction, _itemDto?: IServerItemDataModel) => Promise<Response>;
  readonly transformDataToDto: (item: ListItemData) => IServerItemDataModel;
  readonly onSuccess: (itemId: string, _response: IServerItemDataModel) => IAction;
  readonly onError: (itemId: string, _error: Error) => IAction;
  readonly apiEndpoint: string;
}

interface IPostItemDataThunkFactoryDependencies extends IRepostRequestThunkFactory {
  readonly createItem: (value: string) => ListItemData;
  readonly onItemCreated: (item: ListItemData) => IAction;
}

export const postItemDataThunkFactory = (dependencies: IPostItemDataThunkFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch) => {
      const newItem = dependencies.createItem(value);
      dispatch(dependencies.onItemCreated(newItem));
      const itemDto = dependencies.transformDataToDto(newItem);
      const url = dependencies.apiEndpoint;

      return dependencies.postItem(url, HttpAction.POST, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(newItem.id, response)))
        .catch((response) =>
          dispatch(dependencies.onError(newItem.id, response)));
    };

export const repostRequestThunkFactory = (dependencies: IRepostRequestThunkFactory) =>
  (itemId: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      const item = getState().items.data.get(itemId);
      const itemDto = dependencies.transformDataToDto(item);

      return dependencies.postItem(dependencies.apiEndpoint, HttpAction.POST, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(itemId, response)))
        .catch((error) =>
          dispatch(dependencies.onError(itemId, error)));
    };
