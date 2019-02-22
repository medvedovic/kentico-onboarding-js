import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/containers/App.tsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../src/reducers/rootReducer';
import { initialState } from '../src/constants/initialState';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
});
