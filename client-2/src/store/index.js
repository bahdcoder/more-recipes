import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export const history = createHistory();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history))),
);

export default store;
