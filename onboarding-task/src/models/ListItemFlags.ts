import { TypedRecord } from './TypedRecord';

/**
 * List Item Flags Model
 */
interface IListItemFlags {
  /** Shows whether the item is opened for editation */
  readonly isBeingEdited: boolean;
}

const defaultValues: IListItemFlags = {
  isBeingEdited: false,
};

/**
 * Represents flags on an item
 */
export class ListItemFlags extends TypedRecord<IListItemFlags>(defaultValues) implements IListItemFlags {
  readonly isBeingEdited: boolean;
}
