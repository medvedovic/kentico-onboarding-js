import { Record } from 'immutable';

const defaultValues = {
  guid: '',
  value: '',
};

/**
 * Represents a single item in the list
 */
export const ListItemData = Record(defaultValues);
