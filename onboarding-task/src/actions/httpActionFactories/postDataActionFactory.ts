import {
  IServerItemDataViewModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataViewModel';

import { IAction } from '../IAction';
import { IItemDataActionDependencies } from './itemDataActionFactory';


interface IPostItemDataActionFactoryDependencies extends IItemDataActionDependencies {
  createItemOperation: (value: string) => IAction;
}

export const postItemData = (
  dependencies: IItemDataActionDependencies,
  dispatch: Dispatch,
  url: string,
  localId: string,
  itemDto: IServerItemDataViewModel | undefined
) =>
  dependencies.operation(url, itemDto)
    .then((response: IServerItemDataViewModel) =>
      dispatch(dependencies.onSuccess(localId, response)))
    .catch((response: Error) =>
      dispatch(dependencies.onError(localId, response)));

export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch) => {
      const { payload: { item } } = dispatch(dependencies.createItemOperation(value));

      const itemDto = toServerItemDataViewModel(item);

      const url = dependencies.apiEndpoint;

      return postItemData(dependencies, dispatch, url, item.id, itemDto);
    };


