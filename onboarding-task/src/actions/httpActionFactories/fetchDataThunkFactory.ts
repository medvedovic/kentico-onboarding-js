import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';
import { fetchBuilder } from './fetchBuilder';
import { FETCH_DATA } from '../../constants/actionTypes';
import { ListItemData } from '../../models/ListItemData';
import { listItemDataConverter } from '../../utils/listItemDataConverter';
import { apiEndpoint } from '../../constants/apiEndpoint';

interface IFetchDataThunkFactory {
  fetchOperation: (value: string, httpMethod: HttpAction) => Promise<Response>;
  fetchIsLoading: () => IAction;
  onFetchSucceeded: (items: Array<IServerItemDataModel>) => IAction;
  onFetchFailed: (error: Error) => IAction;
  httpMethod: HttpAction;
  apiEndpoint: string;
}

export const fetchDataThunkFactory = (dependencies: IFetchDataThunkFactory ) =>
  () =>
    (dispatch: Dispatch) => {
      dispatch(dependencies.fetchIsLoading());

      return dependencies.fetchOperation(dependencies.apiEndpoint, dependencies.httpMethod)
        .then((response) => response.json())
        .then((response) => {
          dispatch(dependencies.onFetchSucceeded(response));
        })
        .catch((response) => {
          dispatch(dependencies.onFetchFailed(response));
        });
    };

export const fetchIsLoading = () => ({
  type: FETCH_DATA.IS_LOADING,
});

export const fetchHasFailed = (error: Error) => ({
  type: FETCH_DATA.HAS_FAILED,
  payload: {
    error,
  }
});

export const fetchHasSucceededBuilder = (factory: (value: string, id: string) => ListItemData) =>
  (items: Array<IServerItemDataModel>) => ({
    type: FETCH_DATA.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });

export const fetchData = fetchDataThunkFactory({
  fetchOperation: fetchBuilder(fetch),
  fetchIsLoading: fetchIsLoading,
  onFetchSucceeded: fetchHasSucceededBuilder(listItemDataConverter),
  onFetchFailed: fetchHasFailed,
  httpMethod: HttpAction.GET,
  apiEndpoint
});
