import isUUID from 'validator/lib/isUUID';

import models from '../database/models';


/**
 * Express middleware to verify if request has jwt auth token
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {function} next express middleware next() function
 * @returns {function} express next() function
 */
export default async (req, res, next) => {
  if (!isUUID(req.params.id)) {
    return res.sendFailureResponse('Recipe not found.', 404);
  }
  const recipe = await models.Recipe.findById(req.params.id);

  if (!recipe) {
    return res.sendFailureResponse({ message: 'Recipe not found.' }, 404);
  }

  if (recipe.userId !== req.authUser.id) {
    return res.sendFailureResponse({ message: 'Unauthorized.' }, 401);
  }
  req.currentRecipe = recipe;
  next();
};
