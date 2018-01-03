import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootEpic from './epics';
import rootReducer from './reducers';

export const history = createHistory();
const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...[routerMiddleware(history), epicMiddleware]))
);

export default store;
