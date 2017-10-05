import { Dispatch } from 'react-redux';
import { IItemDataDTO } from '../models/ItemDataDTO';
import {
  EHttpActionStatus,
  ItemActions
} from '../constants/actionTypes';
import { fetchActionBuilderComposed } from './fetchActions';
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

export const postSuccess = fetchActionBuilderComposed(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.success);
export const postError = fetchActionBuilderComposed(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.error);

/**
 * Resends item to server
 */
export const repostItemDataActionFactory = (dependencies: IRepostItemDataActionFactoryDependencies) =>
  (localId: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const item = getState().items.data.get(localId);

      return dependencies.postOperation(dependencies.apiEndpoint, item.value)
        .then(response => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPostSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPostError(localId, response)));
    };

/**
 * Creates and sends item to server
 */
export const postItemDataActionFactory = (dependencies: IPostItemDataActionFactoryDependencies) =>
  (value: string) =>
    (dispatch: Dispatch<any>) => {
      const { payload: { item: { localId } } } = dispatch(dependencies.createItemOperation(value));

      return dependencies.postOperation(dependencies.apiEndpoint, value)
        .then((response) => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPostSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPostError(localId, response)));
    };


