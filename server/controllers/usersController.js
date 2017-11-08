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

    await models.Favorite.findOrCreate({ where: { userId: req.authUser.id, recipeId: recipe.id } });

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
    const favoritesInstances = await models.Favorite.findAll({
      where: { userId: req.authUser.id }
    });

    const favoritesIds = favoritesInstances.map(favorite => favorite.recipeId);

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
