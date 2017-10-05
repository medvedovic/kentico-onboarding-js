import { Dispatch } from 'react-redux';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';

interface IRepostItemDataActionFactoryDependencies {
  postOperation: (url: string, value: string) => Promise<Response>;
  onPostSuccess: (localId: string, response: IItemDataDTO) => IAction;
  onPostError: (localId: string, response: Error) => IAction;
  apiEndpoint: string;
}

interface IPostItemDataActionFactoryDependencies extends IRepostItemDataActionFactoryDependencies {
  createItemOperation: (value: string) => IAction;
}

/**
 * Core function used in both derived functions
 */
const postItemDataCore = (dependencies: IRepostItemDataActionFactoryDependencies, dispatch: Dispatch<any>, value: string,  localId: string) =>
  dependencies.postOperation(dependencies.apiEndpoint, value)
    .then(response => response.json())
    .then((response: IItemDataDTO) =>
      dispatch(dependencies.onPostSuccess(localId, response)))
    .catch((response: Error) =>
      dispatch(dependencies.onPostError(localId, response)));

/**
 * Resends item to server
 */
export const repostItemDataActionFactory = (dependencies: IRepostItemDataActionFactoryDependencies) =>
  (localId: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const item = getState().items.data.get(localId);

      return postItemDataCore(dependencies, dispatch, item.value, localId);
    };

/**
 * Creates and sends item to server
 */
export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch<any>) => {
      const { payload: { item: { localId } } } = dispatch(dependencies.createItemOperation(value));

      return postItemDataCore(dependencies, dispatch, value, localId);
    };


