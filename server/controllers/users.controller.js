import models from '../database/models';
import client from '../helpers/redis-client';
/**
 * Controller for all `users` endpoints
 * @export
 * @class UsersController
 */
export default class UsersController {
  /**
   * Favorite a recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async favorite(req, res) {
    try {
      const recipe = req.currentRecipe;

      await client.sadd(`user:${req.authUser.id}:favorites`, recipe.id);

      return res.sendSuccessResponse({ message: 'Recipe favorited!' });
    } catch (e) {
      return res.sendFailureResponse(e.message, 500);
    }
  }
  /**
   * Get all the user favorite recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async getFavorites(req, res) {
    const favoritesIds = await client.smembers(`user:${req.authUser.id}:favorites`);

    const favorites = await Promise.all(favoritesIds.map(async (id) => {
      const recipe = await models.Recipe.findById(id);
      return recipe;
    }));

    return res.sendSuccessResponse({ favorites });
  }
}
