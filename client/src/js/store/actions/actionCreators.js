/**
 *Create a reducer for the upvote action
 *
 * @param {any} recipeId the id of the recipe to be upvoted
 * @returns {obj} reducer
 */
export function upvote(recipeId) {
  return {
    type: 'UPVOTE_RECIPE',
    recipeId
  };
}

/**
 *Create a reducer for the downvote action
 *
 * @param {any} recipeId the id of the recipe to be upvoted
 * @returns {obj} reducer
 */
export function downvote(recipeId) {
  return {
    type: 'UPVOTE_RECIPE',
    recipeId
  };
}
