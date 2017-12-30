import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const middleware = [];
const mockStore = configureStore(middleware);

it('renders without crashing', () => {
  const store = mockStore({ recipes: [] });
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
