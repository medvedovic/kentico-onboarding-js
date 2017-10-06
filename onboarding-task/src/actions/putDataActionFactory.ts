import { Dispatch } from 'react-redux';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../models/ItemDataDTO';
import { IAction } from './IAction';
import { Store } from '../reducers/stores';
import { IItemDataActionDependencies } from './itemDataActionFactory';

interface IPutDataActionFactory extends IItemDataActionDependencies {
  updateItemOperation: (localId: string, value: string) => IAction;
}

export const putDataActionFactoryCore = (
  dependencies: IItemDataActionDependencies,
  dispatch: Dispatch<any>,
  url: string,
  localId: string,
  itemDto: IItemDataDTO | undefined
) =>
  dependencies.operation(url, itemDto)
    .then((response: Response) => response.json())
    .then((response: IItemDataDTO) =>
      dispatch(dependencies.onSuccess(localId, response)))
    .catch((response: Error) =>
      dispatch(dependencies.onError(localId, response)));


export const putDataActionFactory = (dependencies: IPutDataActionFactory) =>
  (localId: string, value: string) =>
    (dispatch: Dispatch<any>, getState: () => Store.IRoot) => {
      const item = getState().items.data.get(localId);
      const itemDto = toItemDataDTO(item);

      dispatch(dependencies.updateItemOperation(localId, value));

      const url = `${dependencies.apiEndpoint}/${item.id}`;

      return putDataActionFactoryCore(dependencies, dispatch, url, localId, itemDto);
    };
