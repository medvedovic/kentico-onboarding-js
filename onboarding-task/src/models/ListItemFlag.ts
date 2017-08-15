import { Record } from 'immutable';

const defaultValues = {
  isBeingEdited: false,
};

type listItemFlagParams = {
  isBeingEdited: boolean;
};

/**
 * List Item Flags Model
 */
export interface IListItemFlags extends Record<string, any> {
  /** Shows whether item is opened for editation */
  isBeingEdited: boolean;
}

/**
 * Represents flags on an item
 */
export class ListItemFlag extends Record(defaultValues) implements IListItemFlags {
  isBeingEdited: boolean;
  constructor(params?: listItemFlagParams) {
    params ? super({...params}) : super();
  }
}
