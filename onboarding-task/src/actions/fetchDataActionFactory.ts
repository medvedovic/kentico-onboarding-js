import { Dispatch } from 'react-redux';

import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';

interface IFetchDataActionFactory {
  fetchOperation: (value: string) => Promise<Response>;
  startLoader: () => IAction;
  stopLoader: () => IAction;
  onFetchSucceeded: (items: Array<IItemDataDTO>) => IAction;
  onFetchFailed: (error: Error) => IAction;
  apiEndpoint: string;
}

export const fetchDataActionFactory = (dependencies: IFetchDataActionFactory ) =>
  () =>
    (dispatch: Dispatch<any>) => {
      dispatch(dependencies.startLoader());

      return dependencies.fetchOperation(dependencies.apiEndpoint)
        .then((response: Response) => response.json())
        .then((response: Array<IItemDataDTO>) => {
          dispatch(dependencies.onFetchSucceeded(response));
          dispatch(dependencies.stopLoader());
        })
        .catch((response: Error) => {
          dispatch(dependencies.onFetchFailed(response));
          dispatch(dependencies.stopLoader());
        });
    };


