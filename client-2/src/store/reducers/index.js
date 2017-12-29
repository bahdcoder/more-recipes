import { combineReducers } from 'redux';

import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer
});


export default rootReducer;
