import * as memoize from 'memoizee';

import { ListItemData } from '../models/ListItemData';
import { ListItemFlags } from '../models/ListItemFlags';

import { IItemViewModel} from '../models/IItemViewModel';

export const createViewModel = (item: ListItemData, flags: ListItemFlags): IItemViewModel => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedCreateViewModel = memoize(createViewModel);
