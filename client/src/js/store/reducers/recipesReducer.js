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
    case 'REMOVE_RECIPE':
      return state.filter(recipe => recipe.id !== action.payload.recipeId);
    case 'RECIPE_UPDATED':
      return [
        ...state.slice(0, action.payload.recipeIndex),
        action.payload.recipe,
        ...state.slice(action.payload.recipeIndex + 1)
      ];
    case 'ADD_USER_TO_UPVOTERS':
      return state.map((recipe, index) => {
        if (index !== action.payload.indexOfRecipe) {
          return recipe;
        }

        return {
          ...recipe,
          upvotersIds: [
            ...recipe.upvotersIds,
            action.payload.userId
          ]
        };
      });
    case 'ADD_USER_TO_DOWNVOTERS':
      return state.map((recipe, index) => {
        if (index !== action.payload.indexOfRecipe) {
          return recipe;
        }

        return {
          ...recipe,
          downvotersIds: [
            ...recipe.downvotersIds,
            action.payload.userId
          ]
        };
      });
    case 'REMOVE_USER_FROM_UPVOTERS':
      return state.map((recipe, index) => {
        if (index !== action.payload.indexOfRecipe) {
          return recipe;
        }

        return {
          ...recipe,
          upvotersIds: [
            ...recipe.upvotersIds.slice(0, action.payload.indexOfUpvoter),
            ...recipe.upvotersIds.slice(action.payload.indexOfUpvoter + 1),
          ]
        };
      });
    case 'REMOVE_USER_FROM_DOWNVOTERS':
      return state.map((recipe, index) => {
        if (index !== action.payload.indexOfRecipe) {
          return recipe;
        }

        return {
          ...recipe,
          downvotersIds: [
            ...recipe.downvotersIds.slice(0, action.payload.indexOfDownvoter),
            ...recipe.downvotersIds.slice(action.payload.indexOfDownvoter + 1),
          ]
        };
      });
    case 'ADD_USER_TO_FAVORITERS':
      return state.map((recipe, index) => {
        if (index !== action.payload.indexOfRecipe) {
          return recipe;
        }

        return {
          ...recipe,
          favoritersIds: [
            ...recipe.favoritersIds,
            action.payload.userId
          ]
        };
      });
    case 'REMOVE_USER_FROM_FAVORITERS':
      return state.map((recipe, index) => {
        if (index !== action.payload.indexOfRecipe) {
          return recipe;
        }

        return {
          ...recipe,
          favoritersIds: [
            ...recipe.favoritersIds.slice(0, action.payload.indexOfFavoriter),
            ...recipe.favoritersIds.slice(action.payload.indexOfFavoriter + 1),
          ]
        };
      });
    default:
      return state;
  }
}
