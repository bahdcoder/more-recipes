import models from '../database/models';


/**
 * Express middleware to verify if request has jwt auth token
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {function} next express middleware next() function
 * @returns {function} express next() function
 */
export default async (req, res, next) => {
  const recipe = await models.Recipe.findById(req.params.id);

  if (!recipe) {
    return res.sendFailureResponse('Recipe not found.', 404);
  }

  if (parseInt(recipe.userId, 10) !== parseInt(req.authUser.id, 10)) {
    return res.sendFailureResponse('Unauthorized.', 401);
  }
  req.currentRecipe = recipe;
  next();
};
