import models from '../database/models';
import client from '../helpers/redis-client';
/**
 * Class VotesCorntroller to take care of all votes
 */
export default class VotesController {
  /**
   * Return all upvoters for a recipe
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {array} array of users
   * @memberof VotesController
   */
  async getVoters(req, res) {
    try {
      const recipe = await models.Recipe.findById(req.params.id);

      if (!recipe) {
        return res.sendFailureResponse('Recipe not found.', 404);
      }

      const upvotersUserIds = await client.smembers(`recipe:${recipe.id}:upvotes`);
      const downvotersUserIds = await client.smembers(`recipe:${recipe.id}:downvotes`);

      const upVoters = await Promise.all(upvotersUserIds.map(async (id) => {
        const user = await models.User.findById(id);
        return user;
      }));

      const downVoters = await Promise.all(downvotersUserIds.map(async (id) => {
        const user = await models.User.findById(id);
        return user;
      }));

      return res.sendSuccessResponse({ voters: { upVoters, downVoters } });
    } catch (e) {
      return res.sendFailureResponse({ message: e.message }, 500);
    }
  }
  
  /**
   * Upvote a recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async upvote(req, res) {
    try {
      const recipe = req.currentRecipe;

      await client.sadd(`recipe:${recipe.id}:upvotes`, req.authUser.id);

      return res.sendSuccessResponse({ message: 'Recipe upvoted!' });
    } catch (e) {
      return res.sendFailureResponse(e.message, 500);
    }
  }

  /**
   * Upvote a recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async downvote(req, res) {
    try {
      const recipe = req.currentRecipe;

      await client.sadd(`recipe:${recipe.id}:downvotes`, req.authUser.id);

      return res.sendSuccessResponse({ message: 'Recipe downvoted!' });
    } catch (e) {
      return res.sendFailureResponse(e.message, 500);
    }
  }
}
