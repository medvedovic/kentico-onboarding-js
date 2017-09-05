/**
 * Merged Item data with Flags
 */
export interface IItemViewModel {
  /** Guid of item */
  readonly guid: string;
  /** Value held by item */
  readonly value: string;
  /** Shows whether item is opened for editation */
  readonly isBeingEdited: boolean;

  readonly isSavedSuccess: boolean;
}
