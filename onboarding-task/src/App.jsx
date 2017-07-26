import './sticky-footer.css';
import React from 'react';
import { ListContainer } from './containers/ListContainer';

export function App() {
  return (
    <div>
      <div className="container">
        <div className="header clearfix">
          <h3 className="text-muted">Kentico Academy</h3>
        </div>

        <div id="app-content">
          <ListContainer />
        </div>

      </div>

      <footer className="footer">
        <p>&copy; 2016 Kentico Software</p>
      </footer>
    </div>
  );
}

App.displayName = 'App';
