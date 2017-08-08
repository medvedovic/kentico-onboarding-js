import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
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

  _handleItemNameChanged = (e) => {
    const { value } = e.target;

    this.setState(() => ({
      value,
    }));
  };

  _handleUpdate = () => {
    const { value } = this.state;

    if (isTextInputValid(value)) {
      this.props.onUpdateItem(value);
      this.props.onCancelEdit();
    }
    else {
      this.errorElement.style.display = 'block';
    }
  };

  render() {
    const { onCancelEdit } = this.props;
    const handlers = {
      'saveKey': this._handleUpdate,
      'cancelKey': onCancelEdit,
    };

    return (
      <HotKeys handlers={handlers} >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={this.state.value}
            onChange={this._handleItemNameChanged}
            ref={(input) => {
              this.textInput = input;
            }}
            autoFocus
          />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={this._handleUpdate}>Save</button>
            <button type="button" className="btn btn-default" onClick={onCancelEdit}>Cancel</button>
            <button type="button" className="btn btn-default" onClick={this.props.onDeleteItem}>Delete</button>
          </div>
        </div>
        <span
          className="error"
          style={{
            display: 'none',
          }}
          ref={span => {
            this.errorElement = span;
          }}
        >Invalid input!</span>
      </HotKeys>
    );
  }
}

