import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  routing: routerReducer,
  authUser: authReducer,
});

export default rootReducer;
