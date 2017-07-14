import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem.jsx';
import ListItemInput from './ListItemInput';

class List extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <ol className="list">
            {
              this.props.items.map(item => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  itemName={item.itemName}
                  onUpdateItem={this.props.onUpdateItem}
                  onDeleteItem={this.props.onDeleteItem}
                />
              ))
            }
          </ol>
          <ListItemInput onCreateItem={this.props.onCreateItem} />
        </div>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  onCreateItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default List;
