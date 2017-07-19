import './sticky-footer.css';
import React, { Component } from 'react';
import { List } from './components/List';

export function App(props) {
  return (
    <div>
      <div className="container">
        <div className="header clearfix">
          <h3 className="text-muted">Kentico Academy</h3>
        </div>

        <div id="app-content">
          <List />
        </div>

      </div>

      <footer className="footer">
        <p>&copy; 2016 Kentico Software</p>
      </footer>
    </div>
  );
}

App.displayname = 'App';
