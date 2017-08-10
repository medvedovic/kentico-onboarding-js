import { Record } from 'immutable';
import { IListItemData } from '../interfaces';

const defaultValues = {
  id: '',
  value: '',
};

type listItemDataParams = {
  id: string;
  value: string;
};

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
