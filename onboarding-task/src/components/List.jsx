import React, { Component } from 'react';
import assignment from './../../../assignment.gif';
import PropTypes from 'prop-types';

import generateGUID from '../index.js';
import TsComponent from './TsComponent.tsx';
import ListItem from './ListItem.jsx';
import ListItemInput from './ListItemInput';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  addItem(name) {
    this.setState(prevState => ({
      items: prevState.items.concat({ id: generateGUID(), itemName: name }),
    }));
  }
  updateItem(key, name) {
    const newArray = [];
    this.state.items.forEach(item => {
      if (item.id === key) {
        newArray.push({ id: key, itemName: name });
      }
      else {
        newArray.push(item);
      }
    });
    this.setState({ items: newArray });
  }
  deleteItem(key) {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== key),
    }));
  }
  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <ol className="list">
              {
                items.map((item) => (
                  <ListItem
                    key={item.id.toString()}
                    id={item.id}
                    itemName={item.itemName}
                    onUpdateItem={this.updateItem}
                    onDeleteItem={this.deleteItem}
                  />
                ))
              }
            </ol>
            <ListItemInput onAddItem={this.addItem} />
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
};

export default List;
