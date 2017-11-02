import api from './api';
import auth from './auth';
import authorize from './authorize';
import canReview from './can-review';
import canUpvote from './can-upvote';
import canDownvote from './can-downvote';
import canFavorite from './can-favorite';
import signinUserValidator from './signin-user.validator';
import createRecipeValidator from './create-recipe.validator';
import registerUserValidator from './register-user.validator';

export default {
  api,
  auth,
  canUpvote,
  authorize,
  canReview,
  canDownvote,
  canFavorite,
  createRecipeValidator,
  registerUserValidator,
  signinUserValidator
};
