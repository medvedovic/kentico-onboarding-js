import { Record } from 'immutable';
import { IListItemFlags } from '../interfaces';

const defaultValues = {
  isBeingEdited: false,
};

type listItemFlagParams = {
  isBeingEdited: boolean;
};

/**
 * Represents flags on an item
 */
export class ListItemFlag extends Record(defaultValues) implements IListItemFlags {
  isBeingEdited: boolean;
  constructor(params?: listItemFlagParams) {
    params ? super({...params}) : super();
  }
}
