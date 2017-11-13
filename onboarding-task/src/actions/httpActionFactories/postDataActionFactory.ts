import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataModel';

import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';


interface IPostItemDataActionFactoryDependencies {
  operation: (_url: string, _itemDto?: IServerItemDataModel) => Promise<Response>;
  createItem: (value: string) => ListItemData;
  onItemCreated: (item: ListItemData) => IAction;
  onSuccess: (_localId: string, _response?: IServerItemDataModel | Error) => IAction;
  onError: (_localId: string, _error: IServerItemDataModel | Error) => IAction;
  apiEndpoint: string;
}

export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch) => {
      const newItem = dependencies.createItem(value);
      dispatch(dependencies.onItemCreated(newItem));
      const itemDto = toServerItemDataViewModel(newItem);
      const url = dependencies.apiEndpoint;

      return dependencies.operation(url, itemDto)
        .then((response: Response) => response.json())
        .then((response: IServerItemDataModel) =>
          dispatch(dependencies.onSuccess(newItem.id, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onError(newItem.id, response)));
    };


