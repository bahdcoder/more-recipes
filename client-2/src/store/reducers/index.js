import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  router: routerReducer,
  users: usersReducer,
  form: formReducer,
  auth: authReducer
});


export default rootReducer;
