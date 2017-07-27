import React from 'react';
import PropTypes from 'prop-types';

import { isTextInputValid } from '../utils/isTextInputValid';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';
  static propTypes = {
    item: PropTypes.shape({
      guid: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    onItemUpdate: PropTypes.func.isRequired,
    onItemCancelEdit: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.item.value,
    };
  }

  _handleKeyboardInput = (e) => {
    switch (e.key) {
      case 'Escape':
        this.props.onItemCancelEdit();
        break;
      case 'Enter':
        if (document.activeElement === this.textInput) {
          this._handleUpdateItemNameClick();
        }
        break;
      default:
        return;
    }
  };

  _handleItemNameChanged = (e) => {
    const { value } = e.target;

    this.setState(() => ({
      value,
    }));
  };

  _handleUpdateItemNameClick = () => {
    const { value } = this.state;

    if (isTextInputValid(value)) {
      this.props.onItemUpdate(value);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={this._handleItemNameChanged}
          onKeyDown={this._handleKeyboardInput}
          ref={(input) => {
            this.textInput = input;
          }}
          autoFocus
        />
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" onClick={this._handleUpdateItemNameClick}>Save</button>
          <button type="button" className="btn btn-default" onClick={this.props.onItemCancelEdit}>Cancel</button>
          <button type="button" className="btn btn-default" onClick={this.props.onItemDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

