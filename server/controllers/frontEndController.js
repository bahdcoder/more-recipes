import models from '../database/models';
import client from '../helpers/redis-client';

/**
 * Controller to handle the personal requests of the frontend
 *
 * @export
 * @class FrontEndController
 */
export default class FrontEndController {
  /**
   * Return data needed by the home page
   *
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} json
   * @memberof FrontEndController
   */
  async home(req, res) {
    // Get the most favorited recipes begin
    const recipeFavoritesIds = await client.keys('recipe:*:favorites');

    client.multi();
    recipeFavoritesIds.forEach(id => client.smembers(id));

    const recipeFavoritesIdsValues = await client.exec();
    const recipeFavoritesIdsObject = {};

    for (let index = 0; index < recipeFavoritesIds.length; index += 1) {
      const recipeId = recipeFavoritesIds[index].slice(0, -10).slice(-36);
      recipeFavoritesIdsObject[recipeId] = recipeFavoritesIdsValues[index].length;
    }

    const sortedRecipeIds = Object.keys(recipeFavoritesIdsObject)
      .sort((a, b) => recipeFavoritesIdsObject[a] < recipeFavoritesIdsObject[b]);

    const mostFavoritedRecipes = await models.Recipe.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: sortedRecipeIds.slice(0, 3)
        }
      },
      include: {
        model: models.User,
        attributes: { exclude: ['password'] }
      }
    });

    // Get the most favorited recipes end

    // Get the latest recipes begin
    const latestRecipes = await models.Recipe.findAll({
      limit: 6,
      order: [['createdAt', 'DESC']],
      include: {
        model: models.User,
        attributes: { exclude: ['password'] }
      }
    });

    // Get the latest recipes end


    return res.sendSuccessResponse({
      mostFavoritedRecipes,
      latestRecipes
    });
  }


  /**
   * Get the three most favorited recipes
   *
   * @memberof FrontEndController
   * @returns {array} array of models.Recipe
   */
  async getMostFavoritedRecipes() {
    const recipeFavoritesIds = await client.keys('recipe:*:favorites');
    // using redis pipelines, get their respective values
    client.multi();
    recipeFavoritesIds.forEach(id => client.smembers(id));

    const recipeFavoritesIdsValues = await client.exec();
    const recipeFavoritesIdsObject = {};

    for (let index = 0; index < recipeFavoritesIds.length; index += 1) {
      const recipeId = recipeFavoritesIds[index].slice(0, -10).slice(-36);
      recipeFavoritesIdsObject[recipeId] = recipeFavoritesIdsValues[index].length;
    }

    const sortedRecipeIds = Object.keys(recipeFavoritesIdsObject)
      .sort((a, b) => recipeFavoritesIdsObject[a] < recipeFavoritesIdsObject[b]);

    const mostFavoritedRecipes = await models.Recipe.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: sortedRecipeIds.slice(0, 3)
        }
      },
      include: {
        model: models.User,
        attributes: { exclude: ['password'] }
      }
    });

    return mostFavoritedRecipes;
  }
}
