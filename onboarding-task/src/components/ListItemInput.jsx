import React from 'react';
import PropTypes from 'prop-types';

import { isTextInputValid } from '../utils/isTextInputValid';
import { itemFactory } from '../utils/itemFactory';

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
      const newItem = itemFactory(value);
      this.props.onCreateItem(newItem);
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

  _focusOnShortcut = (e) => {
    if (e.altKey && e.key === 'n') {
      if (document.activeElement === this.textInput) {
        this.textInput.blur();
      }
      else {
        this.textInput.focus();
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this._focusOnShortcut, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._focusOnShortcut);
  }

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
              ref={(input) => {
                this.textInput = input;
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}
