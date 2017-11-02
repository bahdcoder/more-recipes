import models from '../database/models';
/**
 * Controller to handle all reviews for recipes
 * @export ReviewsController
 * @class ReviewsController
 */
export default class ReviewsController {
  /**
   * Get all reviews for a recipe
   * @param {any} req express request object
   * @param {any} res express response object
   * @memberof ReviewsController
   * @returns {array} array of recipes
   */
  async index(req, res) {
    const recipe = await models.Recipe.findById(
      req.params.id,
      { include: { model: models.Review } }
    );

    if (!recipe) {
      return res.sendFailureResponse('Recipe not found.', 404);
    }
    return res.sendSuccessResponse({ recipe });
  }

  /**
   * Store a new review to the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} json of newly saved review
   * @memberof ReviewsController
   */
  async create(req, res) {
    try {
      const review = await models.Review.create({
        review: req.body.review,
        recipeId: req.currentRecipe.id,
        userId: req.authUser.id
      });
      return res.sendSuccessResponse({ review, message: 'Recipe reviewed successfully.' });
    } catch (e) {
      return res.sendFailureResponse(e.message);
    }
  }
}
