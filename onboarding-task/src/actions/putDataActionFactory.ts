import { Dispatch } from 'react-redux';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';

interface IPutDataActionFactory {
  putOperation: (url: string, id: string, value: string) => Promise<Response>;
  onPutSuccess: (localId: string, response: IItemDataDTO) => IAction;
  onPutError: (localId: string, response: Error) => IAction;
  updateItemOperation: (localId: string, value: string) => IAction;
  apiEndpoint: string;
}

export const putDataActionFactory = (dependencies: IPutDataActionFactory) =>
  (localId: string, value: string) =>
    (dispatch: Dispatch<any>, getState: any) => {
      const { id } = getState().items.data.get(localId);
      dispatch(dependencies.updateItemOperation(localId, value));

      return dependencies.putOperation(dependencies.apiEndpoint, id, value)
        .then((response: Response) => response.json())
        .then((response: IItemDataDTO) =>
          dispatch(dependencies.onPutSuccess(localId, response)))
        .catch((response: Error) =>
          dispatch(dependencies.onPutError(localId, response)));
    };
