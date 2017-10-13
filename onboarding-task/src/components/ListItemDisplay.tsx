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

const ListItemDisplay: React.SFC<ListItemDisplayProps> = ({ value, method, isSavedSuccess, onClick, onResendRequest }) => {
  const callOnResendRequest = () => {
    onResendRequest(method);
  };

  return (
    isSavedSuccess
      ? <span className="list-clickable" onClick={onClick}>{value}</span>
      : <div className="error-message-item">
        <span>{value}</span>
        <button className="btn btn-default btn-custom" onClick={callOnResendRequest}>Resend</button>
      </div>
  );
};

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { ListItemDisplay };
