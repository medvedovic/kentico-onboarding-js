import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IListItemDisplayDataProps {
  isSavedSuccess: boolean;
  value: string;
  method: string;
}

export interface IListItemDisplayCallbacksProps {
  onResendRequest: (method: string) => void;
  onClick: () => void;
}

type ListItemDisplayProps = IListItemDisplayCallbacksProps & IListItemDisplayDataProps;

const ListItemDisplay: React.SFC<ListItemDisplayProps> = ({ value, method, isSavedSuccess, onClick, onResendRequest }) => (
  isSavedSuccess
    ? <span onClick={onClick}>{value}</span>
    : <div className="error-message-item">
      <span onClick={onClick}>{value}</span>
      <button onClick={() => onResendRequest(method)}>Resend</button>
    </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { ListItemDisplay };
