import React from 'react';
import PropTypes from 'prop-types';
import ListItemEditor from './ListItemEditor';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isBeingEdited: false, itemName: this.props.itemName };
    this.handleEditItemClick = this.handleEditItemClick.bind(this);
    this.handleUpdateItemClick = this.handleUpdateItemClick.bind(this);
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
  // handleDeleteItemClick() {
  //   /* Delete item */
  // }
  render() {
    const isBeingEdited = this.state.isBeingEdited;
    return (
      <li>
        {!isBeingEdited ? (<span onClick={this.handleEditItemClick}>{this.state.itemName}</span>) :
          (<ListItemEditor itemName={this.state.itemName} onItemUpdate={this.handleUpdateItemClick} onItemCancelEdit={this.toggleBeingEdited} />)
        }
      </li>
    );
  }
}

ListItem.propTypes = {
  itemName: PropTypes.string,
};
