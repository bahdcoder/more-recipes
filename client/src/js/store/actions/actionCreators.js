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
 * @param {any} user user data for sign in
 * @returns {Promise} resolves a promise
 */
export function signIn({ email, password }) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.post(`${apiUrl}/users/signin`, {
        email, password
      });

      localStorage.setItem('authUser', JSON.stringify(response.data.data));

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data.data
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

/**
 * Dispatch the action to sign a user out
 *
 * @export
 * @returns {Promise} resolved promise
 */
export function signOut() {
  return async (dispatch) => {
    localStorage.removeItem('authUser');

    dispatch({
      type: 'SIGN_OUT_USER'
    });

    return Promise.resolve();
  };
}


/**
 * Dispatch the action to sign up a user
 *
 * @export
 * @returns {Promise} resolved promise
 */
export function signUp({ name, email, password }) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.post(`${apiUrl}/users/signup`, {
        email, password, name
      });

      localStorage.setItem('authUser', JSON.stringify(response.data.data));

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data.data
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
/**
 * Dispatch the action to create a new recipe
 *
 * @param {obj} recipe the recipe to be created
 * @export {Promise} resolved promise
 * @returns {Promise} resolved promise
 */
export function createRecipe(recipe) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.post(`${apiUrl}/recipes`, recipe);

      dispatch({
        type: 'NEW_RECIPE_CREATED',
        payload: response.data.data.recipe
      });
      return Promise.resolve(response);
    } catch (errors) {
      return Promise.reject(errors);
    }
  };
}

/**
 * Update the recipes in store
 *
 * @export {func} action creator
 * @param {obj} recipe recipe to be added to store
 * @returns {promise} Promise resolved
 */
export function updateRecipesInStore(recipe) {
  return (dispatch) => {
    dispatch({
      type: 'NEW_RECIPE_CREATED',
      payload: recipe
    });

    return Promise.resolve();
  };
}
/**
 * Get the paginated reviews for the recipe
 *
 * @export {func} action creator
 * @param {any} recipeId id of the recipe whose reviews we wanna get
 * @returns {Promise} resolved promise
 */
export function getRecipeReviews(recipeId) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.get(`${apiUrl}/recipes/${recipeId}/reviews`);
      console.log(response);
      dispatch({
        type: 'NEW_REVIEWS_ADDED',
        payload: {
          recipeId,
          reviews: response.data.data.reviews
        }
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

