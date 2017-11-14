import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import authReducer from './authReducer';
import reviewsReducer from './reviewsReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  routing: routerReducer,
  authUser: authReducer,
  loadingBar: loadingBarReducer,
  reviews: reviewsReducer
});

export default rootReducer;
