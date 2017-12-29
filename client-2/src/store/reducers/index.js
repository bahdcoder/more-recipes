import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  router: routerReducer
});


export default rootReducer;
