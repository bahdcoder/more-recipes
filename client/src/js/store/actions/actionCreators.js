import axios from 'axios';

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

/**
 * Dispatch the action to sign a user in
 * 
 * @export
 * @param {any} user 
 * @returns 
 */
export function signIn({ email, password }) {
  // SIGN_IN_USER if auth was successful
  // SIGN_IN_FAILURE if auth was not successful
  // maybe !!! ASYNC_OPERATION_PENDING at beginning of API call
  return async (dispatch, getState) => {
    try {
      const response = await axios.post('http://localhost:4080/api/v1/users/signin', {
        email, password
      });

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}