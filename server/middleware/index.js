import api from './api';
import auth from './auth';
import authorize from './authorize';
import canReview from './canReview';
import canUpvote from './canUpvote';
import canDownvote from './canDownvote';
import canFavorite from './canFavorite';
import signinUserValidator from './signinUserValidator';
import createRecipeValidator from './createRecipeValidator';
import registerUserValidator from './registerUserValidator';

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
