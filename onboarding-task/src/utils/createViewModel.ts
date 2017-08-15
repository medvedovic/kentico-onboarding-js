import * as memoize from 'memoizee';
import { IItemViewModel} from '../interfaces';
import { IListItemData } from '../models/ListItemData';
import { IListItemFlags } from '../models/ListItemFlag';

export const createViewModel = (item: IListItemData, flags: IListItemFlags): IItemViewModel => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedCreateViewModel = memoize(createViewModel);
