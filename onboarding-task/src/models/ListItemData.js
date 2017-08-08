import { Record } from 'immutable';

const defaultValues = {
  id: '',
  value: '',
};

/**
 * Represents a single item in the list
 */
export const ListItemData = Record(defaultValues);
