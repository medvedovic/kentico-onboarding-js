import { Record } from 'immutable';
import { ListItemData } from './ListItemData';
import { ListItemFlag } from './ListItemFlag';

/**
 * Represents a wrapper object for both item data and flags
 */

export const ListItemViewModel = Record({
  listItemData: new ListItemData,
  listItemFlag: new ListItemFlag,
});
