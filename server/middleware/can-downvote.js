import models from '../database/models';
import client from '../helpers/redis-client';
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

  if (recipe.userId === req.authUser.id) {
    return res.sendFailureResponse('Unauthorized.', 401);
  }

  client.smembers(`recipe:${recipe.id}:upvotes`, (error, upvotes) => {
    if (error) {
      return res.sendFailureResponse('Server error.', 500);
    }

    if (upvotes.indexOf(req.authUser.id) !== -1) {
      return res.sendFailureResponse("Can't downvote.", 400);
    }

    req.currentRecipe = recipe;
    next();
  });
};
