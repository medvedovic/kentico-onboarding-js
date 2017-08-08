import './sticky-footer.css';
import React from 'react';
import { List } from './containers/List';

export const App = () => (
  <div>
    <div className="container">
      <div className="header clearfix">
        <h3 className="text-muted">Kentico Academy</h3>
      </div>

      <div id="app-content">
        <List />
      </div>

      <section className="shortcuts">
        <h3>List of shortcuts</h3>
        <ul>
          <li><code>alt + n</code>Focus main input</li>
          <li><code>escape</code>Cancel</li>
        </ul>
        <p>More to be added...</p>
      </section>

    </div>

    <footer className="footer">
      <p>&copy; 2016 Kentico Software</p>
    </footer>
  </div>
);

App.displayName = 'App';
