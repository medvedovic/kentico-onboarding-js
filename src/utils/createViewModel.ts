import * as memoize from 'memoizee';
import { ListItemData } from '../models/ListItemData';
import { ListItemFlags } from '../models/ListItemFlags';
import { ItemViewModel } from '../models/ItemViewModel';

export const createViewModel = (item: ListItemData, flags: ListItemFlags): ItemViewModel => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedCreateViewModel = memoize(createViewModel);
