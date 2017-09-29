import { Dispatch } from 'react-redux';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { fetchActionBuilderComposed } from './fetchActions';
import {
  EHttpActionStatus,
  HttpAction
} from '../constants/actionTypes';
import { IAction } from './IAction';

interface IPutDataActionFactory {
  putOperation: (url: string, id: string, value: string) => Promise<Response>;
  onPutSuccess: (localId: string, response: IItemDataDTO) => IAction;
  onPutError: (localId: string, response: Error) => IAction;
  updateItemOperation: (localId: string, value: string) => IAction;
}

export const putSuccess = fetchActionBuilderComposed(HttpAction.PUT, EHttpActionStatus.success);
export const putError = fetchActionBuilderComposed(HttpAction.PUT, EHttpActionStatus.error);

export const putDataActionFactory = (dependencies: IPutDataActionFactory) =>
  (url: string, localId: string, value: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const { id } = getState().items.data.get(localId);
      dispatch(dependencies.updateItemOperation(localId, value));

      return dependencies.putOperation(url, id, value)
        .then((response: Response) => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPutSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPutError(localId, response)));
    };
