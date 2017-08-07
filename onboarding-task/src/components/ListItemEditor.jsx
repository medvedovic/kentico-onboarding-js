import React from 'react';
import PropTypes from 'prop-types';
import HotKey from 'react-shortcut';

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

  _handleKeyboardInput = () => {
    if (document.activeElement === this.textInput) {
      this._handleUpdateClick();
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
    const saveKey = ['enter'];
    const cancelKey = ['escape'];
    const { value } = this.state;

    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={this._handleItemNameChanged}
          ref={(input) => {
            this.textInput = input;
          }}
          autoFocus
        />
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" onClick={this._handleUpdateClick}>Save</button>
          <HotKey keys={saveKey} onKeysCoincide={this._handleKeyboardInput} />
          <button type="button" className="btn btn-default" onClick={this.props.onCancelEdit}>Cancel</button>
          <HotKey keys={cancelKey} onKeysCoincide={this.props.onCancelEdit} />
          <button type="button" className="btn btn-default" onClick={this.props.onDeleteItem}>Delete</button>
        </div>
      </div>
    );
  }
}

