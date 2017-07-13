import React from 'react';
import PropTypes from 'prop-types';
import ListItemEditor from './ListItemEditor';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isBeingEdited: false, itemName: this.props.itemName };
    this.handleEditItemClick = this.handleEditItemClick.bind(this);
    this.handleUpdateItemClick = this.handleUpdateItemClick.bind(this);
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
    this.toggleBeingEdited = this.toggleBeingEdited.bind(this);
  }
  handleEditItemClick() {
    this.toggleBeingEdited();
  }
  handleUpdateItemClick(value) {
    this.toggleBeingEdited();
    this.setState({ itemName: value });
  }
  toggleBeingEdited() {
    this.setState({ isBeingEdited: !(this.state.isBeingEdited) });
  }
  handleDeleteItemClick() {
    this.props.onDeleteItem(this.props.id);
  }
  render() {
    const isBeingEdited = this.state.isBeingEdited;
    return (
      <li>
        {!isBeingEdited ? (<span onClick={this.handleEditItemClick} >{this.state.itemName}</span>) :
          (<ListItemEditor itemName={this.state.itemName} onItemUpdate={this.handleUpdateItemClick} onItemCancelEdit={this.toggleBeingEdited} onItemDelete={this.handleDeleteItemClick} />)
        }
      </li>
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.string,
  itemName: PropTypes.string,
  onDeleteItem: PropTypes.func,
};
