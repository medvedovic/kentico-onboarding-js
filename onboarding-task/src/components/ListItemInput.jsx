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

  componentDidMount() {
    document.addEventListener('keydown', this._handleInputOnEnter);
  }

  componentWillMount() {
    document.removeEventListener('keydown', this._handleInputOnEnter);
  }

  _handleInputOnEnter = (e) => {
    if ((e.key === 'Enter') && document.activeElement === this.textInput) {
      this._handleCreateItemClick();
    }
  };

  _handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState(() => {
      return {
        value,
      };
    });
  };

  _handleCreateItemClick = () => {
    const { value } = this.state;
    if (isTextInputValid(value)) {
      this.props.onCreateItem(value);
      this._resetInput();
    }
    else {
      this._resetInput();
      return;
    }
  };

  _resetInput = () => {
    this.setState(() => {
      return {
        value: '',
      };
    });
    this.textInput.blur();
  };

  render() {
    const { value } = this.state;
    return (
      <div className="col-sm-12 top-offset">
        <div className="input-group">
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this._handleCreateItemClick}>Add</button>
          </span>
          <input
            type="text"
            className="form-control enlarge"
            onChange={this._handleInputChanged}
            value={value}
            ref={(input) => {
              this.textInput = input;
            }}
          />
        </div>
      </div>
    );
  }
}
