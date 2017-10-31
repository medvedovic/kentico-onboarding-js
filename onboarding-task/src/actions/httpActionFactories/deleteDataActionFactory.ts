
import { IItemDataActionDependencies } from './itemDataActionFactory';
import { Dispatch } from '../../@types/globals';


export const deleteItemData = (
  dependencies: IItemDataActionDependencies,
  dispatch: Dispatch,
  url: string,
  localId: string
) =>
  dependencies.operation(url)
    .then(() =>
      dispatch(dependencies.onSuccess(localId)))
    .catch((response: Error) =>
      dispatch(dependencies.onError(localId, response)));
