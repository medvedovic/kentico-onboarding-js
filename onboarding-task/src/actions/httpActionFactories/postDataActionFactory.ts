import {
  IServerItemDataViewModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataViewModel';

import { IAction } from '../IAction';
import { IRedoRequestToServerFactoryDependencies } from './redoRequestToServerFactory';


interface IPostItemDataActionFactoryDependencies extends IRedoRequestToServerFactoryDependencies {
  createItemOperation: (value: string) => IAction;
}

export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch) => {
      const { payload: { item } } = dispatch(dependencies.createItemOperation(value));

      const itemDto = toServerItemDataViewModel(item);

      const url = dependencies.apiEndpoint;

      return dependencies.operation(url, itemDto)
        .then((response: IServerItemDataViewModel) =>
          dispatch(dependencies.onSuccess(item.id, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onError(item.id, response)));
    };


