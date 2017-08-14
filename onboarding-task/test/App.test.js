import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../src/reducers/reducer';
import { initialState } from '../src/constants/initialState';

const store = createStore(rootReducer, initialState);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
});
