import React from 'react';

import { ListItem } from './ListItem.jsx';
import { ListItemInput } from './ListItemInput';
import { GuidGenerator } from '../utils/GuidGenerator';

export class List extends React.Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: GuidGenerator.generate(), itemName: 'Make coffee' },
        { id: GuidGenerator.generate(), itemName: 'Master React' },
      ],
    };
  }

  _createNewItem = (value) => {
    this.setState(prevState => ({
      items: prevState.items.concat({
        id: GuidGenerator.generate(), itemName: value,
      }),
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
    this.setState({
      items: newArray,
    });
  };

  _deleteItem = (key) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== key),
    }));
  };

  render() {
    const { items } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <ol className="list">
            {
              items.map(item => (
                <li key={item.id}>
                  <ListItem
                    id={item.id}
                    itemName={item.itemName}
                    onUpdateItem={this._updateItem}
                    onDeleteItem={this._deleteItem}
                  />
                </li>
              ))
            }
          </ol>
          <ListItemInput onCreateItem={this._createNewItem} />
        </div>
      </div>
    );
  }
}
