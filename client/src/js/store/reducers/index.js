import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import reviewsReducer from './reviewsReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  routing: routerReducer,
  authUser: authReducer,
  reviews: reviewsReducer,
  users: usersReducer
});

export default rootReducer;
