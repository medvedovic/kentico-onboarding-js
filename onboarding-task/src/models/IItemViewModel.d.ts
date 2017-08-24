/**
 * Merged Item data with Flags
 */
export interface IItemViewModel {
  /** Guid of item */
  guid: string;
  /** Value held by item */
  value: string;
  /** Shows whether item is opened for editation */
  isBeingEdited: boolean;
}
