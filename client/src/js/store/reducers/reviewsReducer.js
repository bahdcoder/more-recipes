/**
 * Handle the reviews for a single recipe
 * @param {array} state the initial state
 * @param {obj} action the action to be dispatched
 * @returns {obj} new state of recipe reviews
 */
function recipeReview(state = [], action) {
  switch (action.type) {
    case 'NEW_REVIEWS_ADDED':
      return [
        ...state,
        ...action.payload.reviews
      ];
    default:
      return state;
  }
}


/**
 * The reducer for the reviews
 *
 * @export
 * @param {array} [state=[]] initial state
 * @param {obj} action action to be reduced
 * @returns {array} state
 */
export default function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case 'NEW_REVIEWS_ADDED':
      return {
        ...state,
        [action.payload.recipeId]: recipeReview(state[action.payload.recipeId], action)
      };
    default:
      return state;
  }
}

//  reviews: { recipe1: ['review1', 'review2'], recipe2: [ 'review3', 'review3' ] }

