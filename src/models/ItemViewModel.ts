import * as PropTypes from 'prop-types';

export type ItemViewModel = {
  readonly guid: string;
  readonly value: string;
  readonly isBeingEdited: boolean;
  readonly isSavedSuccess: boolean;
  readonly failedHttpAction: string;
};

export const ItemViewModelPropTypeShape: PropTypes.ValidationMap<ItemViewModel> = {
  guid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  isSavedSuccess: PropTypes.bool.isRequired,
  failedHttpAction: PropTypes.string.isRequired,
};
