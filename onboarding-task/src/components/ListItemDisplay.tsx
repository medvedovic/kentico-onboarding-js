import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IListItemDisplayDataProps {
  isSavedSuccess: boolean;
  value: string;
}

export interface IListItemDisplayCallbacksProps {
  onClick: () => void;
}

type ListItemDisplayProps = IListItemDisplayCallbacksProps & IListItemDisplayDataProps;

const ListItemDisplay: React.SFC<ListItemDisplayProps> = ({ value, isSavedSuccess, onClick }) => (
  <span className={isSavedSuccess ? '' : 'alert alert-danger'} onClick={onClick}>{value}</span>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { ListItemDisplay };
