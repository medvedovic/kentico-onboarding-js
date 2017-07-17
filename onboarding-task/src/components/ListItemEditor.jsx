import React from 'react';
import PropTypes from 'prop-types';

export class ListItemEditor extends React.Component {
  static propTypes = {
    itemName: PropTypes.string,
    onItemUpdate: PropTypes.func,
    onItemCancelEdit: PropTypes.func,
    onItemDelete: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemName: props.itemName,
    };
  }

  _handleItemNameChanged = (e) => {
    const val = e.target.value;
    this.setState({
      itemName: val,
    });
  };

  _handleUpdateItemNameClick =() => {
    this.props.onItemUpdate(this.state.itemName);
  };

  render() {
    return (
      <div className="form-group">
        <input type="text" className="form-control" value={this.state.itemName} onChange={this._handleItemNameChanged} />
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" onClick={this._handleUpdateItemNameClick}>Save</button>
          <button type="button" className="btn btn-default" onClick={this.props.onItemCancelEdit}>Cancel</button>
          <button type="button" className="btn btn-default" onClick={this.props.onItemDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

