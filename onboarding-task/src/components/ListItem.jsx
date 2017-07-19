import React from 'react';
import PropTypes from 'prop-types';
import { ListItemEditor } from './ListItemEditor';

export class ListItem extends React.Component {
  static displayName = 'displayName';
  static propTypes = {
    id: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
      itemName: this.props.itemName,
    };
  }

  _handleUpdateItemClick = (value) => {
    this._toggleBeingEdited();
    this.props.onUpdateItem(this.props.id, value);
    this.setState({
      itemName: value,
    });
  };

  _handleDeleteItemClick = () => {
    this.props.onDeleteItem(this.props.id);
  };

  _toggleBeingEdited = () => {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited,
    });
  };

  render() {
    const isBeingEdited = this.state.isBeingEdited;
    return (
      <li>
        {
          !isBeingEdited ? (
            <span onClick={this._toggleBeingEdited}>{this.state.itemName}</span>
          ) : (
            <ListItemEditor
              itemName={this.state.itemName}
              onItemUpdate={this._handleUpdateItemClick}
              onItemCancelEdit={this._toggleBeingEdited}
              onItemDelete={this._handleDeleteItemClick}
            />
          )
        }
      </li>
    );
  }
}
