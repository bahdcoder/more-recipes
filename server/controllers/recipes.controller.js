import models from '../database/models';
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
    try {
      const reqBody = req.body;
      const recipe = await models.Recipe.create({
        title: reqBody.title,
        description: reqBody.description,
        imageUrl: reqBody.imageUrl,
        timeToCook: reqBody.time_to_cook,
        ingredients: reqBody.ingredients,
        procedure: reqBody.procedure,
        upvoters: JSON.stringify([]),
        downvoters: JSON.stringify([]),
        userId: req.authUser.id
      });

      return res.sendSuccessResponse({ recipe }, 201);
    } catch (e) {
      return res.sendFailureResponse({ message: e.message });
    }
  }
  /**
   * Update a recipe in storage
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json with updated recipe
   * @memberof RecipesController
   */
  async update(req, res) {
    try {
      const recipe = req.currentRecipe;
      const reqBody = req.body;

      await recipe.update({
        title: reqBody.title,
        description: reqBody.description,
        imageUrl: reqBody.imageUrl,
        timeToCook: reqBody.time_to_cook,
        ingredients: reqBody.ingredients,
        procedure: reqBody.procedure
      });

      return res.sendSuccessResponse(recipe, 200);
    } catch (error) {
      return res.sendFailureResponse(error.message, 404);
    }
  }

  /**
   * Delete a recipe from the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} confirmation message
   * @memberof RecipesController
   */
  async destroy(req, res) {
    try {
      const recipe = req.currentRecipe;
      await recipe.destroy();
      return res.sendSuccessResponse({ message: 'Recipe deleted.' });
    } catch (e) {
      return res.sendFailureResponse(e.message);
    }
  }
}
