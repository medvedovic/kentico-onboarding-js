import React from 'react';
import { initialItems } from '../constants/initialItems';
import { ListItem } from './ListItem.jsx';
import { ListItemModel } from '../models/ListItem';
import { ListItemInput } from './ListItemInput';
import { generateGuid } from '../utils/generateGuid';

export class List extends React.PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);

    this.state = {
      items: initialItems,
    };
  }

  _createNewItem = (value) => {
    const guid = generateGuid();

    this.setState(prevState => ({
      items: prevState.items.set(guid, new ListItemModel({
        guid,
        value,
      })),
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
              items.forEach((item, guid) => (
                <li key={guid}>
                  <ListItem
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
