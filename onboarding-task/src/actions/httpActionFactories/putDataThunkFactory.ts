import 'isomorphic-fetch';
import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { Store } from '../../reducers/stores';
import { HttpAction } from '../../constants/HttpAction';
import { ListItemData } from '../../models/ListItemData';
import {
  handleErrorRequest,
  handleSuccessfulRequest
} from './requestStatusActions';
import {
  PUT_ITEM_TO_SERVER,
  UPDATE_ITEM
} from '../../constants/actionTypes';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { fetchBuilder } from './fetchBuilder';


export interface IReputItemThunkFactory {
  operation: (_url: string, httpMethod: HttpAction, _itemDto?: IServerItemDataModel) => Promise<Response>;
  transformDataToDto: (item: ListItemData) => IServerItemDataModel;
  onSuccess: (_response: IServerItemDataModel) => IAction;
  onError: (_localId: string, _error: Error) => IAction;
  httpMethod: HttpAction,
  apiEndpoint: string;
}

interface IPutDataThunkFactory extends IReputItemThunkFactory {
  updateItem: (localId: string, value: string) => IAction;
}

export const putDataThunkFactory = (dependencies: IPutDataThunkFactory) =>
  (id: string, value: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      dispatch(dependencies.updateItem(id, value));

      const item = getState().items.data.get(id);
      const itemDto = dependencies.transformDataToDto(item);

      const url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.operation(url, dependencies.httpMethod, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(response)))
        .catch((response) =>
          dispatch(dependencies.onError(id, response)));
    };

export const reputItemThunkFactory = (dependencies: IReputItemThunkFactory) =>
  (localId: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      const item = getState().items.data.get(localId);
      const itemDto = dependencies.transformDataToDto(item);
      let url = `${dependencies.apiEndpoint}/${item.id}`;

      return dependencies.operation(url, dependencies.httpMethod, itemDto)
        .then((response) => response.json())
        .then((response) =>
          dispatch(dependencies.onSuccess(response)))
        .catch((error) =>
          dispatch(dependencies.onError(localId, error)));
    };

export const updateItem = (id: string, value: string): IAction => ({
  type: UPDATE_ITEM,
  payload: {
    item: {
      id,
      value,
    },
  },
});

export const putData = putDataThunkFactory({
  operation: fetchBuilder(fetch),
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  updateItem: updateItem,
  httpMethod: HttpAction.PUT,
  apiEndpoint
});

export const redoPutData = reputItemThunkFactory({
  operation: fetchBuilder(fetch),
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: handleSuccessfulRequest(PUT_ITEM_TO_SERVER.SUCCESS),
  onError: handleErrorRequest(PUT_ITEM_TO_SERVER.FAILURE),
  httpMethod: HttpAction.PUT,
  apiEndpoint
});
