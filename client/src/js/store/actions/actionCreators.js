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
  return async (dispatch, getState) => {
    try {
      const response = await axios.post('http://localhost:4080/api/v1/users/signin', {
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
  return async (dispatch, getState) => {
    localStorage.removeItem('authUser');

    dispatch({
      type: 'SIGN_OUT_USER'
    });

    return Promise.resolve();
  }
}


/**
 * Dispatch the action to sign up a user
 * 
 * @export
 * @returns {Promise} resolved promise
 */
export function signUp({ name, email, password }) {
  return async (dispatch, getState) => {
    
    try {
      const response = await axios.post('http://localhost:4080/api/v1/users/signup', {
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

  }
}

