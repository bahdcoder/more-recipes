import { createStore } from 'redux';

import recipes from '../data';
import rootReducer from './reducers';

const defaultState = {
  recipes
};

const store = createStore(rootReducer, defaultState);

export default store;
