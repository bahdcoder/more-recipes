import models from '../database/models';
import client from '../helpers/redis-client';


/**
 * Controller to handle all recipe endpoint routes
 */
export default class RecipesController {
  /**
   * Return a list of all recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async index(req, res) {
    const recipes = await models.Recipe.findAll({
      include: { model: models.User, exclude: ['password'] },
    });

    if (req.query.sort === 'upvotes') {
      const upvotes = await client.smembers('recipe:*:upvotes');

      if (req.query.order === 'des') {
        recipes.sort((recipeA, recipeB) => upvotes[`recipe:${recipeA}:upvotes`].length > upvotes[`recipe:${recipeB}:upvotes`]);
      } else {
        recipes.sort((recipeA, recipeB) => upvotes[`recipe:${recipeA}:upvotes`].length < upvotes[`recipe:${recipeB}:upvotes`]);
      }
    }

    return res.sendSuccessResponse({ recipes }, 200);
  }


  /**
   * Store a new recipe into the database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created recipe
   * @memberof RecipesController
   */
  async create(req, res) {
    const reqBody = req.body;
    const recipe = await models.Recipe.create({
      title: reqBody.title,
      description: reqBody.description,
      imageUrl: reqBody.imageUrl,
      timeToCook: reqBody.timeToCook,
      ingredients: reqBody.ingredients,
      procedure: reqBody.procedure,
      userId: req.authUser.id
    });

    return res.sendSuccessResponse({ recipe }, 201);
  }


  /**
   * Update a recipe in storage
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json with updated recipe
   * @memberof RecipesController
   */
  async update(req, res) {
    const recipe = req.currentRecipe;
    const reqBody = req.body;

    await recipe.update({
      title: reqBody.title || recipe.title,
      description: reqBody.description || recipe.description,
      imageUrl: reqBody.imageUrl || recipe.imageUrl,
      timeToCook: reqBody.timeToCook || recipe.timeToCook,
      ingredients: reqBody.ingredients || recipe.ingredients,
      procedure: reqBody.procedure || recipe.procedure
    });

    return res.sendSuccessResponse(recipe, 200);
  }


  /**
   * Delete a recipe from the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} confirmation message
   * @memberof RecipesController
   */
  async destroy(req, res) {
    await req.currentRecipe.destroy();
    return res.sendSuccessResponse({ message: 'Recipe deleted.' });
  }
}
