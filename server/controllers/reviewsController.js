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
    const recipe = req.currentRecipe;

    const reviews = await models.Review.findAll({
      where: {
        recipeId: recipe.id
      },
      include: { model: models.User, exclude: ['password'] }
    });

    return res.sendSuccessResponse({ reviews });
  }


  /**
   * Store a new review to the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} json of newly saved review
   * @memberof ReviewsController
   */
  async create(req, res) {
    const createdReview = await models.Review.create({
      review: req.body.review,
      recipeId: req.currentRecipe.id,
      userId: req.authUser.id
    });

    const review = await models.Review.findById(createdReview.id, {
      include: { model: models.User, exclude: ['password'] }
    });
    return res.sendSuccessResponse({ review, message: 'Recipe reviewed successfully.' });
  }
}
