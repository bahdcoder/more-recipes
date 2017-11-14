import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import authReducer from './authReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  routing: routerReducer,
  authUser: authReducer,
  loadingBar: loadingBarReducer
});

export default rootReducer;
