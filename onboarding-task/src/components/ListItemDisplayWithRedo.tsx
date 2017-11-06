import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IListItemDisplayWithRedoDataProps {
  value: string;
  method: string;
}

interface IListItemDisplayWithRedoCallbacksProps {
  onResendRequest: (method: string) => void;
}

type ListItemDisplayWithRedoProps = IListItemDisplayWithRedoCallbacksProps & IListItemDisplayWithRedoDataProps;

class ListItemDisplayWithRedo extends React.PureComponent<ListItemDisplayWithRedoProps> {
  static displayName = 'ListItemDisplayWithRedo';

  static propTypes = {
    value: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    onResendRequest: PropTypes.func.isRequired
  };

  _resendRequest = () => {
    this.props.onResendRequest(this.props.method);
  };

  render() {
    return (
      <div className="error-message-item">
        <span>{this.props.value}</span>
        <button className="btn btn-default btn-custom" onClick={this._resendRequest}>Resend</button>
      </div>
    );
  }
}

export { ListItemDisplayWithRedo }
