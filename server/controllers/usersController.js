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
    const recipe = req.currentRecipe;

    await client.sadd(`user:${req.authUser.id}:favorites`, recipe.id);

    return res.sendSuccessResponse({ message: 'Recipe favorited.' });
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

    const favorites = await models.Recipe.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: favoritesIds
        }
      }
    });

    return res.sendSuccessResponse({ favorites });
  }
}
