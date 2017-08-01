import { Record } from 'immutable';

const defaultValues = {
  isBeingEdited: false,
};

/**
 * Represents flags on an item
 */
export const ListItemFlag = Record(defaultValues);
