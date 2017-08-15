import * as memoize from 'memoizee';

import { IListItemData } from '../models/ListItemData';
import { IListItemFlags } from '../models/ListItemFlag';

import { IItemViewModel} from '../interfaces';

export const createViewModel = (item: IListItemData, flags: IListItemFlags): IItemViewModel => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedCreateViewModel = memoize(createViewModel);
