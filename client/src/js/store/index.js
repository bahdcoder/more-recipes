import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';


import config from './../config';
import rootReducer from './reducers';

const defaultState = {
  recipes: [],
  authUser: null,
  reviews: {}
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(reduxThunk.withExtraArgument(config.apiUrl)))
);

export default store;
