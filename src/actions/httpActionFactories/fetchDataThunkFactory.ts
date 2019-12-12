import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { HttpAction } from '../../constants/HttpAction';
import { ListItemData } from '../../models/ListItemData';


interface IFetchDataThunkFactory {
  readonly sendRequest: (value: string, httpMethod: HttpAction) => Promise<Response>;
  readonly fetchIsLoading: () => IAction;
  readonly convertItem: (value: string, id: string) => ListItemData;
  readonly onFetchSucceeded: (items: Array<ListItemData>) => IAction;
  readonly onFetchFailed: (error: Error) => IAction;
  readonly apiEndpoint: string;
}

export const fetchDataThunkFactory = (dependencies: IFetchDataThunkFactory) =>
  () =>
    (dispatch: Dispatch) => {
      dispatch(dependencies.fetchIsLoading());

      // return dependencies.sendRequest(dependencies.apiEndpoint, HttpAction.GET)
      return Promise.resolve({
        json: () => [
          {
            id: '0',
            value: 'something',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      })
        .then(response => response.json())
        .then((items: Array<IServerItemDataModel>) =>
          items.map(item => dependencies.convertItem(item.value, item.id)))
        .then(items => {
          dispatch(dependencies.onFetchSucceeded(items));
        })
        .catch(response => {
          dispatch(dependencies.onFetchFailed(response));
        });
    };
