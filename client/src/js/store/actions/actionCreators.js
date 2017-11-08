/**
 *Create a reducer for the upvote action
 *
 * @param {any} recipeId the id of the recipe to be upvoted
 * @returns {obj} reducer
 */
function upvote(recipeId) {
  return {
    type: 'UPVOTE_RECIPE',
    recipeId
  };
}

export default {
  upvote
};
