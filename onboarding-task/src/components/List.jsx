import React from 'react';
import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem.jsx';
import { ListItemModel } from '../model/ListItemModel';
import { ListItemInput } from './ListItemInput';
import { generateGuid } from '../utils/generateGuid';

export class List extends React.PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: new OrderedMap([
        [generateGuid(), new ListItemModel({ value: 'Make coffee' })],
        [generateGuid(), new ListItemModel({ value: 'Master React' })],
      ]),
    };
  }

  _createNewItem = (value) => {
    this.setState(prevState => ({
      items: prevState.items.set(generateGuid(), new ListItemModel({ value })),
    }));
  };

  _updateItem = (key, value) => {
    const prevItem = this.state.items.get(key);
    const newItem = new ListItemModel({ ...prevItem.toJS(), value });
    this.setState(prevState => ({
      items: prevState.items.set(key, newItem),
    }));
  };

  _deleteItem = (key) => {
    this.setState(prevState => ({
      items: prevState.items.delete(key),
    }));
  };

  render() {
    const { items } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <ol className="list">
            {
              items.map((item, key) => (
                <li key={key}>
                  <ListItem
                    id={key}
                    item={item}
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
