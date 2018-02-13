import lockr from 'lockr';
import axios from 'axios';
import queryString from 'query-string';
import { push } from 'react-router-redux';

import { setAxios } from '../../helpers';

/**
 * Check if user is authenticated
 *
 * @export
 * @returns {Bool} true or false
 */
export function checkAuth() {
  return (dispatch, getState) => {
    if (getState().authUser) {
      return true;
    }

    return false;
  };
}
/**
 * Get sorted recipes
 *
 * @export
 * @param {str} search the recipes search query
 * @returns {Promise} promise
 */
export function getRecipesCatalog() {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.get(`${apiUrl}/recipes${getState().routing.locationBeforeTransitions.search}`);

      response.data.data.recipes.recipes.forEach((recipe) => {
        if (getState().recipes.findIndex(storeRecipe => recipe.id === storeRecipe.id) === -1) {
          dispatch({
            type: 'NEW_RECIPE_CREATED',
            payload: recipe
          });
        }
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

/**
 * Change the current route params
 *
 * @export
 * @returns {null} null
 */
export function triggerGetRecipesCatalog() {
  return (dispatch) => {
    dispatch({
      type: 'TRIGGER_GET_RECIPES_CATALOG'
    });
  };
}

/**
 * Change the current route params
 *
 * @export
 * @param {str} name The name of the query
 * @param {str} value the new value of the query param
 * @param {obj} location the current location object
 * @returns {null} null
 */
export function changeRouterQueryParams(name, value, location) {
  return async (dispatch) => {
    const currentQuery = location.query;

    currentQuery[name] = value;
    dispatch(push(`${location.pathname}?${queryString.stringify(currentQuery)}`));
  };
}


/**
 * Get the data needed for the home page
 *
 * @export
 * @returns {Promise} promise resolve/reject
 */
export function getHomePageData() {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.get(`${apiUrl}/frontend/home`);

      response.data.data.latestRecipes.forEach((recipe) => {
        if (getState().recipes.findIndex(storeRecipe => recipe.id === storeRecipe.id) === -1) {
          dispatch({
            type: 'NEW_RECIPE_CREATED',
            payload: recipe
          });
        }
      });

      response.data.data.mostFavoritedRecipes.forEach((recipe) => {
        if (getState().recipes.findIndex(storeRecipe => recipe.id === storeRecipe.id) === -1) {
          dispatch({
            type: 'NEW_RECIPE_CREATED',
            payload: recipe
          });
        }
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
}

/**
 * Get a single recipe from api
 * @param {string} recipeId
 * @returns {object} action
 */
export function getSingleRecipe(recipeId) {
  return async (dispatch, getState, apiUrl) => {
    const response = await axios.get(`${apiUrl}/recipes/${recipeId}`);
    const { recipe } = response.data.data;

    dispatch({
      type: 'NEW_RECIPE_CREATED',
      payload: recipe
    });
  };
}

/**
 *Toggle a user upvote status for a recipe
 *
 * @param {any} indexOfRecipe the index of the recipe to be upvoted
 * @param {bool} userHasUpvoted bool if user has upvoted this recipe
 * @param {bool} userHasDownvoted bool if user has downvoted this recipe
 * @param {int} indexOfUpvoter index of the userid in upvotersArray
 * @param {int} indexOfDownvoter index of the downvoter in downvotersArray
 * @param {int} recipeId id of recipe to be downvoted
 * @returns {Promise} Promise resolve/reject
 */
export function toggleUpvote(
  indexOfRecipe,
  userHasUpvoted,
  userHasDownvoted,
  indexOfUpvoter, indexOfDownvoter, recipeId
) {
  return async (dispatch, getState, apiUrl) => {
    try {
      if (!userHasUpvoted) {
        dispatch({
          type: 'ADD_USER_TO_UPVOTERS',
          payload: {
            indexOfRecipe,
            userId: getState().authUser.user.id
          }
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            level: 'SUCCESS',
            message: 'Recipe upvoted successfully.'
          }
        });
      } else {
        dispatch({
          type: 'REMOVE_USER_FROM_UPVOTERS',
          payload: {
            indexOfRecipe,
            indexOfUpvoter
          }
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            level: 'SUCCESS',
            message: 'Upvote removed successfully.'
          }
        });
      }
      if (userHasDownvoted) {
        dispatch({
          type: 'REMOVE_USER_FROM_DOWNVOTERS',
          payload: {
            indexOfRecipe,
            indexOfDownvoter
          }
        });
      }

      await axios.post(`${apiUrl}/recipes/${recipeId}/upvote`);
      return Promise.resolve();
    } catch (errors) {
      return Promise.reject(errors);
    }
  };
}

/**
 *Toggle a user upvote status for a recipe
 *
 * @param {any} indexOfRecipe the index of the recipe to be upvoted
 * @param {bool} userHasUpvoted bool if user has upvoted this recipe
 * @param {bool} userHasDownvoted bool if user has downvoted this recipe
 * @param {int} indexOfUpvoter index of the userid in upvotersArray
 * @param {int} indexOfDownvoter index of the downvoter in downvotersArray
 * @param {int} recipeId id of recipe to be downvoted
 * @returns {Promise} Promise resolve/reject
 */
export function toggleDownvote(
  indexOfRecipe,
  userHasUpvoted, userHasDownvoted, indexOfUpvoter, indexOfDownvoter, recipeId
) {
  return async (dispatch, getState, apiUrl) => {
    try {
      if (!userHasDownvoted) {
        dispatch({
          type: 'ADD_USER_TO_DOWNVOTERS',
          payload: {
            indexOfRecipe,
            userId: getState().authUser.user.id
          }
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            level: 'SUCCESS',
            message: 'Recipe downvoted successfully.'
          }
        });
      } else {
        dispatch({
          type: 'REMOVE_USER_FROM_DOWNVOTERS',
          payload: {
            indexOfRecipe,
            indexOfDownvoter
          }
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            level: 'SUCCESS',
            message: 'Downvote removed successfully.'
          }
        });
      }

      if (userHasUpvoted) {
        dispatch({
          type: 'REMOVE_USER_FROM_UPVOTERS',
          payload: {
            indexOfRecipe,
            indexOfUpvoter
          }
        });
      }

      await axios.post(`${apiUrl}/recipes/${recipeId}/downvote`);
      return Promise.resolve();
    } catch (errors) {
      return Promise.reject(errors);
    }
  };
}
/**
 * Toggle user favorites recipe status
 *
 * @export
 * @param {int} indexOfRecipe recipe index in store
 * @param {bool} hasFavorited if user has favorited recipe
 * @param {int} indexOfFavoriter index of favoriter in recipe favoriterIds in store
 * @param {uuid} recipeId id of the recipe
 * @returns {Promise} Promise
 */
export function toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter, recipeId) {
  return async (dispatch, getState, apiUrl) => {
    try {
      if (hasFavorited) {
        dispatch({
          type: 'REMOVE_USER_FROM_FAVORITERS',
          payload: { indexOfRecipe, indexOfFavoriter }
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            level: 'SUCCESS',
            message: 'Recipe removed from favorites successfully.'
          }
        });
      } else {
        dispatch({
          type: 'ADD_USER_TO_FAVORITERS',
          payload: {
            indexOfRecipe,
            userId: getState().authUser.user.id
          }
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            level: 'SUCCESS',
            message: 'Recipe favorited successfully.'
          }
        });
      }

      await axios.post(`${apiUrl}/users/${recipeId}/favorites`);
    } catch (error) {
      return Promise.reject();
    }
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

      lockr.set('authUser', response.data.data);
      setAxios(response.data.data);

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data.data
      });

      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Successfully signed in.'
        }
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
    lockr.rm('authUser');

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

      lockr.set('authUser', response.data.data);
      setAxios(response.data.data);

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data.data
      });

      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Welcome to BahdRecipes !'
        }
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
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Recipe created successfully.'
        }
      });
      return Promise.resolve(response);
    } catch (errors) {
      return Promise.reject(errors);
    }
  };
}

/**
 * Update a recipe
 *
 * @export
 * @param {any} recipe the new recipe data
 * @param {uuid} recipeId the id of the recipe
 * @returns {Promise} Promise
 */
export function updateRecipe(recipe, recipeId) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.put(`${apiUrl}/recipes/${recipeId}`, recipe);

      const recipeIndex = getState().recipes
        .findIndex(recipeInStore => recipeInStore.id === recipeId);

      dispatch({
        type: 'RECIPE_UPDATED',
        payload: {
          recipeIndex,
          recipe: response.data.data.recipe
        }
      });

      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Recipe updated successfully.'
        }
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

/**
 * Get all the recipes for a user
 *
 * @export
 * @param {int} userId id of the user
 * @returns {Promise} resolve, reject
 */
export function getUserRecipes(userId) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${userId}/recipes`);

      response.data.data.recipes.forEach((recipe) => {
        if (getState().recipes.findIndex(storeRecipe => recipe.id === storeRecipe.id) === -1) {
          dispatch({
            type: 'NEW_RECIPE_CREATED',
            payload: recipe
          });
        }
      });

      const { user } = response.data.data;
      if (getState().users.findIndex(storeUser => storeUser.id === user.id) === -1) {
        dispatch({
          type: 'NEW_USER_ADDED',
          payload: user
        });
      }
      return Promise.resolve();
    } catch (errors) {
      return Promise.reject();
    }
  };
}

/**
 * Create a review for the recipe
 *
 * @export
 * @param {any} review { recipeId, review }
 * @returns {Promise} Promise
 */
export function createReview({ recipeId, review }) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.post(`${apiUrl}/recipes/${recipeId}/reviews`, { review });

      dispatch({
        type: 'NEW_REVIEW_ADDED',
        payload: response.data.data.review
      });

      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Recipe reviewed successfully.'
        }
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
/**
 * Get all favorite recipes for a user
 *
 * @export
 * @returns {Promise} promise resolves/rejects
 */
export function getUserFavorites() {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.get(`${apiUrl}/users/favorites`);
      const recipes = response.data.data.favorites;

      recipes.forEach((recipe) => {
        if (getState().recipes.findIndex(recipeInStore => recipeInStore.id === recipe.id) === -1) {
          dispatch({
            type: 'NEW_RECIPE_CREATED',
            payload: recipe
          });
        }
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
/**
 * Find a user and resolve it
 *
 * @export
 * @param {any} userId id of the user to be found
 * @returns {Promise} Promise
 */
export function findUser(userId) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.get(`${apiUrl}/users/profile/${userId}`);

      if (getState().users.findIndex(u => u.id === response.data.data.user.id) === -1) {
        dispatch({
          type: 'NEW_USER_ADDED',
          payload: response.data.data.user
        });
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
/**
 * Update the user's profile
 *
 * @export
 * @param {any} userData The user data to be updated
 * @param {int} index The index of the user in redux store
 * @returns {Promise} Promise reolves/reject
 */
export function updateUserProfile(userData, index) {
  return async (dispatch, getState, apiUrl) => {
    try {
      const response = await axios.put(`${apiUrl}/users/update`, userData);
      const currentUser = JSON.parse(localStorage.getItem('authUser'));
      currentUser.user = response.data.data.user;
      localStorage.setItem('authUser', JSON.stringify(currentUser));

      dispatch({
        type: 'USER_UPDATED',
        payload: {
          user: response.data.data.user,
          index
        }
      });

      dispatch({
        type: 'AUTH_USER_UPDATED',
        payload: response.data.data.user
      });

      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Your profile was updated successfully.'
        }
      });

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

/**
 * Delete a recipe
 * @param {string} recipeId
 * @returns {null} null
 */
export function deleteRecipe(recipeId) {
  return async (dispatch, getState, apiUrl) => {
    try {
      await axios.delete(`${apiUrl}/recipes/${recipeId}`);
      dispatch({
        type: 'REMOVE_RECIPE',
        payload: { recipeId }
      });
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS', message: 'Recipe deleted successfully.'
        }
      });
    } catch (error) {
      // notify user something went wrong.
    }
  };
}
