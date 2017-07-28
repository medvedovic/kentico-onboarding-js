import { Record } from 'immutable';

/**
 * Represents flags on an item
 */

export const ListItemFlag = Record({
  isBeingEdited: false,
  newValue: '',
});
