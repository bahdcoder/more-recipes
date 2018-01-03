import { FETCH_HOME_PAGE_DATA_FULFILLED } from '../../actions/recipes/recipeActions';
/**
 * Handle all recipe actions
 * @param {obj} state the current recipes in store
 * @param {obj} action redux action
 * @returns {obj} new state
 */
const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_HOME_PAGE_DATA_FULFILLED:
      return [
        ...state,
        ...action.payload
      ];
    default:
      return state;
  }
};

export default recipesReducer;
