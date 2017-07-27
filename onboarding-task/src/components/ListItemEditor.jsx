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
    actions: PropTypes.shape({
      onUpdateItem: PropTypes.func.isRequired,
      onDeleteItem: PropTypes.func.isRequired,
    }).isRequired,
    onCancelEdit: PropTypes.func.isRequired,
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
    const { guid } = this.props.item;

    if (isTextInputValid(value)) {
      this.props.actions.onUpdateItem(guid, value);
    }
    this.props.onCancelEdit();
  };

  _handleDeleteClick = () => {
    const { guid } = this.props.item;

    this.props.actions.onDeleteItem(guid);
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
          <button type="button" className="btn btn-default" onClick={this._handleDeleteClick}>Delete</button>
        </div>
      </div>
    );
  }
}

