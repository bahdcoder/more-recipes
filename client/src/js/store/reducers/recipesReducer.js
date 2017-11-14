/**
 * The reducer for the recipes
 *
 * @param {any} [state=[]] The default state for this reducer
 * @param {obj} action the action to be dispatched
 * @returns {object} the next state of the store tree
 */
export default function recipesReducer(state = [], action) {
  switch (action.type) {
    case 'NEW_RECIPE_CREATED':
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}
