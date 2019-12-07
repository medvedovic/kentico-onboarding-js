import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { App } from '../src/containers/App.tsx';
import { rootReducer } from '../src/reducers/rootReducer.ts';
import { initialState } from '../src/constants/initialState.ts';

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
