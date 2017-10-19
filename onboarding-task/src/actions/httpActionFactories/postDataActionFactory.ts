import { Dispatch } from 'react-redux';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../../models/ItemDataDTO';
import { IAction } from '../IAction';
import { IItemDataActionDependencies } from './itemDataActionFactory';

interface IPostItemDataActionFactoryDependencies extends IItemDataActionDependencies {
  createItemOperation: (value: string) => IAction;
}

/**
 * Core function used in both derived functions
 */
export const postItemDataCore = (
  dependencies: IItemDataActionDependencies,
  dispatch: Dispatch<any>,
  url: string,
  localId: string,
  itemDto: IItemDataDTO | undefined
) =>
  dependencies.operation(url, itemDto)
    .then(response => response.json())
    .then((response: IItemDataDTO) =>
      dispatch(dependencies.onSuccess(localId, response)))
    .catch((response: Error) =>
      dispatch(dependencies.onError(localId, response)));

/**
 * Creates and sends item to server
 */
export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch<any>) => {
      const { payload: { item } } = dispatch(dependencies.createItemOperation(value));

      const itemDto = toItemDataDTO(item);

      const url = dependencies.apiEndpoint;

      return postItemDataCore(dependencies, dispatch, url, item.localId, itemDto);
    };


