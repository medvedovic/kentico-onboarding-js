import { ListItemData } from '../../models/ListItemData';

import { IAction } from '../IAction';
import { IServerItemDataViewModel } from '../../models/IServerItemDataViewModel';
import { Store } from '../../reducers/stores';
import { Dispatch } from '../../@types/Dispatch';


export interface IItemDataActionDependencies {
  operation: (_url: string, _itemDto?: IServerItemDataViewModel) => Promise<Response>;
  transformDataToDto?: (item: ListItemData) => IServerItemDataViewModel;
  onSuccess: (_localId: string, _response?: IServerItemDataViewModel | Error) => IAction;
  onError: (_localId: string, _error: IServerItemDataViewModel | Error) => IAction;
  apiEndpoint: string;
}

export const itemDataActionFactory = (
  core: (
    dependencies: IItemDataActionDependencies,
    dispatch: Dispatch,
    url: string,
    localId: string,
    itemDto: IServerItemDataViewModel | undefined
  ) => Promise<IAction>, dependencies: IItemDataActionDependencies) =>
  (localId: string) =>
    (dispatch: Dispatch, getState: () => Store.IRoot) => {
      const item = getState().items.data.get(localId);
      const itemDto = dependencies.transformDataToDto && dependencies.transformDataToDto(item);

      const url = item.id ? `${dependencies.apiEndpoint}/${item.id}` : dependencies.apiEndpoint;

      return core(dependencies, dispatch, url, localId, itemDto);
    };
