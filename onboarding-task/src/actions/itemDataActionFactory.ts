import { Dispatch } from 'react-redux';
import { IAction } from './IAction';
import { IItemDataDTO } from '../models/ItemDataDTO';
import { Store } from '../reducers/stores';
import { ListItemData } from '../models/ListItemData';

export interface IItemDataActionDependencies {
  operation: (_url: string, _itemDto?: IItemDataDTO) => Promise<Response>;
  transformDataToDto?: (item: ListItemData) => IItemDataDTO;
  onSuccess: (_localId: string, _response?: IItemDataDTO | Error) => IAction;
  onError: (_localId: string, _error: IItemDataDTO | Error) => IAction;
  apiEndpoint: string;
}

export const itemDataActionFactory = (
  core: (
    dependencies: IItemDataActionDependencies,
    dispatch: Dispatch<any>,
    url: string,
    localId: string,
    itemDto: IItemDataDTO | undefined
  ) => Promise<IAction>, dependencies: IItemDataActionDependencies) =>
  (localId: string) =>
    (dispatch: Dispatch<any>, getState: () => Store.IRoot) => {
      const item = getState().items.data.get(localId);
      const itemDto = dependencies.transformDataToDto && dependencies.transformDataToDto(item);

      const url = dependencies.apiEndpoint += item.id ? `/${item.id}` : '';

      return core(dependencies, dispatch, url, localId, itemDto);
    };
