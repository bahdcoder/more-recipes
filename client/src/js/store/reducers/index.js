import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import eventsReducer from './eventsReducer';
import reviewsReducer from './reviewsReducer';
import recipesReducer from './recipesReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  routing: routerReducer,
  authUser: authReducer,
  reviews: reviewsReducer,
  users: usersReducer,
  events: eventsReducer,
  notification: notificationReducer
});

export default rootReducer;
