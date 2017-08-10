import * as memoize from 'memoizee';
import { IItemViewModel, IListItemData, IListItemFlags } from '../interfaces';

export const createViewModel = (item: IListItemData, flags: IListItemFlags): IItemViewModel => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedCreateViewModel = memoize(createViewModel);
