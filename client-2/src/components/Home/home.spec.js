/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Home from './index';

const middleware = [];
const mockStore = configureStore(middleware);

it('Should home component render correctly without crashing', () => {
  const store = mockStore({});
  ReactDOM.render(
    <MemoryRouter>
      <Home store={store} />
    </MemoryRouter>
  , document.createElement('div'));
});