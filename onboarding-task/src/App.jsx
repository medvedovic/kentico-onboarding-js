import './sticky-footer.css';
import React, { Component } from 'react';
import List from './components/List';
import generateGUID from './index.js';

window.items = [{ id: generateGUID(), itemName: 'Make coffee' }, { id: generateGUID(), itemName: 'Master React' }];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [{ id: generateGUID(), itemName: 'Make coffee' }, { id: generateGUID(), itemName: 'Master React' }] };

    this.createNewItem = this.createNewItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  createNewItem(value) {
    this.setState(prevState => ({
      items: prevState.items.concat({ id: generateGUID(), itemName: value }),
    }));
  }

  updateItem(key, value) {
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
  }

  deleteItem(key) {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== key),
    }));
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">Kentico Academy</h3>
          </div>

          <section id="app-content">
            <List
              items={this.state.items}
              onCreateItem={this.createNewItem}
              onUpdateItem={this.updateItem}
              onDeleteItem={this.deleteItem}
            />
          </section>

        </div>

        <footer className="footer">
          <p>&copy; 2016 Kentico Software</p>
        </footer>
      </div>
    );
  }
}

export default App;
