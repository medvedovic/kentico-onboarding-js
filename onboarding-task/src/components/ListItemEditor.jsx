import React from 'react';
import PropTypes from 'prop-types';

export default class ListItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemName: props.itemName };
    this.handleItemNameChanged = this.handleItemNameChanged.bind(this);
    this.updateItemName = this.updateItemName.bind(this);
  }
  handleItemNameChanged(e) {
    this.setState({ itemName: e.target.value });
  }
  updateItemName() {
    this.props.onItemUpdate(this.state.itemName);
  }
  render() {
    return (
      <div className="form-group">
        <input type="text" className="form-control" value={this.state.itemName} onChange={this.handleItemNameChanged} />
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-primary" onClick={this.updateItemName}>Save</button>
          <button type="button" className="btn btn-default" onClick={this.props.onItemCancelEdit}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={this.props.onItemDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

ListItemEditor.propTypes = {
  itemName: PropTypes.string,
  onItemUpdate: PropTypes.func,
  onItemCancelEdit: PropTypes.func,
  onItemDelete: PropTypes.func,
};
