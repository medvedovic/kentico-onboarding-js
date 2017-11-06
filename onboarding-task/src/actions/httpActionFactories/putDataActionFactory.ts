import {
  IServerItemDataViewModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataViewModel';

import { IAction } from '../IAction';
import { Store } from '../../reducers/stores';
import { IItemDataActionDependencies } from './itemDataActionFactory';


interface IPutDataActionFactory extends IItemDataActionDependencies {
  updateItemOperation: (localId: string, value: string) => IAction;
}

export const putDataActionFactory = (dependencies: IPutDataActionFactory) =>
  (id: string, value: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      dispatch(dependencies.updateItemOperation(id, value));

      const item = getState().items.data.get(id);
      const itemDto = toServerItemDataViewModel(item);

      const url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.operation(url, itemDto)
        .then((response: IServerItemDataViewModel) =>
          dispatch(dependencies.onSuccess(id, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onError(id, response)));
    };
