import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import recipes from '../data';
import rootReducer from './reducers';

const defaultState = {
  recipes,
  authUser: null
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  defaultState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
