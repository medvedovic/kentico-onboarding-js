import React from 'react';
import PropTypes from 'prop-types';

import { isTextInputValid } from '../utils/isTextInputValid';

export class ListItemInput extends React.PureComponent {
  static displayName = 'ListItemInput';
  static propTypes = {
    onCreateItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  _onSubmitForm = (e) => {
    e.preventDefault();
    const { value } = this.state;

    if (isTextInputValid(value)) {
      this.props.onCreateItem(value);
    }

    this._resetInput();
  };

  _handleInputChanged = (e) => {
    const value = e.target.value;

    this.setState(() => ({
      value,
    }));
  };

  _resetInput = () => {
    this.setState(() => ({
      value: '',
    }));
  };

  render() {
    const { value } = this.state;

    return (
      <div className="col-sm-12 top-offset">
        <form onSubmit={this._onSubmitForm}>
          <div className="input-group">
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default">Add</button>
            </span>
            <input
              type="text"
              className="form-control enlarge"
              onChange={this._handleInputChanged}
              value={value}
            />
          </div>
        </form>
      </div>
    );
  }
}
