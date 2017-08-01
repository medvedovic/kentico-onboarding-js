import { ListItemViewModel } from '../models/ListItemViewModel';

export const mergeItemDataWithFlags = (item, flags) => {
  return new ListItemViewModel({
    ...item.toJS(),
    ...flags.toJS(),
  });
};
