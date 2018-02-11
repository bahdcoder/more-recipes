import reduxThunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';


import config from './../config';
import rootReducer from './reducers';

const defaultState = {
  recipes: [],
  authUser: null,
  reviews: {},
  users: [],
  notification: {},
  events: {}
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(
    reduxThunk.withExtraArgument(config.apiUrl),
    routerMiddleware(browserHistory)
  ))
);

export default store;
