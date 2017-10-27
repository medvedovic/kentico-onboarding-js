import { TypedRecord } from './TypedRecord';

/**
 * List Item Data Model
 */
interface IListItemData {
  /** Id of item */
  readonly id: string;
  /** Value held by item */
  readonly value: string;
}

const defaultValues: IListItemData = {
  id: '',
  value: 'unknown',
};

/**
 * Represents a single item in the list
 */
export class ListItemData extends TypedRecord<IListItemData>(defaultValues) implements IListItemData {
  readonly id: string;
  readonly value: string;
}
