import { ListItemViewModel } from '../models/ListItemViewModel';

export const mergeItemDataWithFlags = (items, flags) => (
  items.map((item) => (
    new ListItemViewModel({
      listItemData: item,
      listItemFlag: flags.get(item.guid),
    })
  ))
);
