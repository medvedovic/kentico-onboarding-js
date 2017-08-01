import React from 'react';
import PropTypes from 'prop-types';

import { isTextInputValid } from '../utils/isTextInputValid';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';
  static propTypes = {
    itemViewModel: PropTypes.shape({
      guid: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.itemViewModel.value,
    };
  }

  _handleKeyboardInput = (e) => {
    switch (e.key) {
      case 'Escape':
        this.props.onCancelEdit();
        break;
      case 'Enter':
        if (document.activeElement === this.textInput) {
          this._handleUpdateClick();
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

  _handleUpdateClick = () => {
    const { value } = this.state;

    if (isTextInputValid(value)) {
      this.props.onUpdateItem(value);
    }
    this.props.onCancelEdit();
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
          <button type="button" className="btn btn-default" onClick={this._handleUpdateClick}>Save</button>
          <button type="button" className="btn btn-default" onClick={this.props.onCancelEdit}>Cancel</button>
          <button type="button" className="btn btn-default" onClick={this.props.onDeleteItem}>Delete</button>
        </div>
      </div>
    );
  }
}

