import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IListItemDisplayDataProps {
  isSavedSuccess: boolean;
  value: string;
}

export interface IListItemDisplayCallbacksProps {
  onRepostData: () => void;
  onClick: () => void;
}

type ListItemDisplayProps = IListItemDisplayCallbacksProps & IListItemDisplayDataProps;

const ListItemDisplay: React.SFC<ListItemDisplayProps> = ({ value, isSavedSuccess, onClick, onRepostData }) => (
  isSavedSuccess
    ? <span onClick={onClick}>{value}</span>
    : <div className="error-message-item">
      <span onClick={onClick}>{value}</span>
      <button onClick={onRepostData}>Resend</button>
    </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { ListItemDisplay };
