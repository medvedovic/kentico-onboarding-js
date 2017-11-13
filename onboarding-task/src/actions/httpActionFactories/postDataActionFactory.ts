import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataModel';

import { IAction } from '../IAction';
import { IRedoRequestToServerFactoryDependencies } from './redoRequestToServerFactory';
import { ListItemData } from '../../models/ListItemData';


interface IPostItemDataActionFactoryDependencies extends IRedoRequestToServerFactoryDependencies {
  createItem: (value: string) => ListItemData;
  onItemCreated: (item: ListItemData) => IAction;
}

export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch) => {
      const newItem = dependencies.createItem(value);
      dispatch(dependencies.onItemCreated(newItem));
      const itemDto = toServerItemDataViewModel(newItem);
      const url = dependencies.apiEndpoint;

      return dependencies.operation(url, itemDto)
        .then((response: IServerItemDataModel) =>
          dispatch(dependencies.onSuccess(newItem.id, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onError(newItem.id, response)));
    };


