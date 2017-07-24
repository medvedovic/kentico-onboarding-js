import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.jsx';

/* Test is skipped because Zuzana told me to skip it */
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
