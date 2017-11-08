import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import recipes from '../data';
import rootReducer from './reducers';

const defaultState = {
  recipes
};

export const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(rootReducer, defaultState, applyMiddleware(middleware));

export default store;
