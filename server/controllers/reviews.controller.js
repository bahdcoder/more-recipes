import { Router } from 'express';
import Database from './../database';
import validators from './../validators';
/**
 * Controller to handle all reviews for recipes
 * @export ReviewsController
 * @class ReviewsController
 */
export default class ReviewsController {
  /**
   * Creates an instance of ReviewsController.
   * @memberof ReviewsController
   */
  constructor() {
    this.router = new Router();
    this.database = new Database();

    //  To be revisited. The naming convension is kinda cliche :(
    this.router.post('/recipes/:recipeId/reviews', (req, res) => { this.store(req, res); });
  }

  /**
   * Store a new review to the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} json of newly saved review
   * @memberof ReviewsController
   */
  async store(req, res) {
    const validator = new validators.StoreReviewValidator(req.body.review);

    if (!validator.isValid()) {
      return res.sendFailureResponse(validator.errors, 422);
    }

    try {
      const recipe = await this.database.saveReview(req.params.recipeId, req.body.review);
      return res.sendSuccessResponse(recipe);
    } catch (e) {
      return res.sendFailureResponse(e.message);
    }
  }
}
