import React from 'react';
import PropTypes from 'prop-types';

export class ListItemEditor extends React.Component {
  static displayName = 'ListItemEditor';
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    onItemUpdate: PropTypes.func.isRequired,
    onItemCancelEdit: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemName: props.itemName,
    };
  }

  componentDidMount() {
    // Cancel editation on ESC
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.props.onItemCancelEdit();
      }
    });
    // Save on enter
    document.addEventListener('keydown', (event) => {
      if ((event.keyCode === 13) && this.state.itemName && document.activeElement === this.textInput) {
        this._handleUpdateItemNameClick();
      }
    });

    this._focus();
  }

  _focus = () => {
    this.textInput.focus();
  };

  _handleItemNameChanged = (e) => {
    const itemName = e.target.value;
    this.setState({
      itemName,
    });
  };

  _handleUpdateItemNameClick =() => {
    this.props.onItemUpdate(this.state.itemName);
  };

  render() {
    const { itemName } = this.state;
    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={itemName}
          onChange={this._handleItemNameChanged}
          ref={(input) => {
            this.textInput = input;
          }}
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

