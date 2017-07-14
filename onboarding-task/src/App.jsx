import './sticky-footer.css';
import React, { Component } from 'react';
import List from './components/List';
import generateGUID from './index.js';

window.items = [{ id: generateGUID(), itemName: 'Make coffee' }, { id: generateGUID(), itemName: 'Master React' }];

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">Kentico Academy</h3>
          </div>

          <section id="app-content">
            <List items={window.items} />
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
