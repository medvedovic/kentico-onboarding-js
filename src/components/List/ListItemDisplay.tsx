import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItemClickable } from './ListItemDisplay.style';

export type ListItemDisplayDataProps = {
  readonly isSavedSuccess: boolean;
  readonly value: string;
  readonly method: string;
};

export type ListItemDisplayCallbacksProps = {
  readonly onResendRequest: (method: string) => void;
  readonly onClick: () => void;
};

type ListItemDisplayProps = ListItemDisplayCallbacksProps
  & ListItemDisplayDataProps;

export const ListItemDisplay: React.FC<ListItemDisplayProps> = ({ value, onClick }) => (
  <ListItemClickable onClick={onClick}>
    {value}
  </ListItemClickable>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
