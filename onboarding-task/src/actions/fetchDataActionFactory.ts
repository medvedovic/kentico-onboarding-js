import { Dispatch } from 'react-redux';
import { fetchStartLoading } from './publicActions';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { IAction } from './IAction';

interface IFetchDataActionFactory {
  fetchOperation: (value: string) => Promise<Response>;
  startLoader: () => IAction;
  stopLoader: () => IAction;
  onFetchSucceeded: (items: Array<IItemDataDTO>) => IAction;
  onFetchFailed: (error: Error) => IAction;
}

export const fetchDataActionFactory = (dependencies: IFetchDataActionFactory ) =>
  (url: string) =>
    (dispatch: Dispatch<any>) => {
      dispatch(fetchStartLoading());

      dependencies.fetchOperation(url)
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


