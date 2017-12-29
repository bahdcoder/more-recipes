
/**
 * Handle all recipe actions
 * @param {obj} state the current recipes in store
 * @param {obj} action redux action
 * @returns {obj} new state
 */
const recipesReducer = (state = [], action) => {
  switch (action.payload) {
    case 'SOME_FOO_ACTION':
      return state;
    default:
      return state;
  }
};

export default recipesReducer;
