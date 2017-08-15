import { Record } from 'immutable';

const defaultValues = {
  id: '',
  value: '',
};

type listItemDataParams = {
  id: string;
  value: string;
};

/**
 * List Item Data Model
 */
export interface IListItemData extends Record<string, any> {
  /** Id of item */
  id: string;
  /** Value held by item */
  value: string;
}

/**
 * Represents a single item in the list
 */
export class ListItemData extends Record(defaultValues) implements IListItemData {
  id: string;
  value: string;
  constructor(params?: listItemDataParams) {
    params ? super({...params}) : super();
  }
}
