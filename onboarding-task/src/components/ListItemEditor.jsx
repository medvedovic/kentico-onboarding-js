import React from 'react';
import PropTypes from 'prop-types';

export class ListItemEditor extends React.PureComponent {
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
    document.addEventListener('keydown', this._handleKeyboarInput);
    this._focus();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyboarInput);
  }

  _handleKeyboarInput = (e) => {
    switch (e.key) {
      case 'Escape':
        this.props.onItemCancelEdit();
        break;
      case 'Enter':
        if (this.state.itemName && document.activeElement === this.textInput) {
          this._handleUpdateItemNameClick();
        }
        break;
      default:
        return;
    }
  };

  _focus = () => {
    this.textInput.focus();
  };

  _handleItemNameChanged = (e) => {
    const itemName = e.target.value;
    this.setState(() => {
      return {
        itemName,
      };
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

