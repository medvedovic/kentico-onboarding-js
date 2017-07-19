import React from 'react';

import { ListItem } from './ListItem.jsx';
import { ListItemInput } from './ListItemInput';
import { generateGUID } from '../utils/GUIDGenerator';

export class List extends React.PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { items: [
      { id: generateGUID(), itemName: 'Make coffee' },
      { id: generateGUID(), itemName: 'Master React' },
    ],
    };
  }

  _createNewItem = (value) => {
    this.setState(prevState => ({
      items: prevState.items.concat({ id: generateGUID(), itemName: value }),
    }));
  };

  _updateItem = (key, value) => {
    const newArray = [];
    this.state.items.forEach(item => {
      if (item.id === key) {
        newArray.push({ id: key, itemName: value });
      }
      else {
        newArray.push(item);
      }
    });
    this.setState({ items: newArray });
  };

  _deleteItem = (key) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== key),
    }));
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <ol className="list">
            {
              this.state.items.map(item => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  itemName={item.itemName}
                  onUpdateItem={this._updateItem}
                  onDeleteItem={this._deleteItem}
                />
              ))
            }
          </ol>
          <ListItemInput onCreateItem={this._createNewItem} />
        </div>
      </div>
    );
  }
}
