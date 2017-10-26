import { Router } from 'express';
import Database from './../database';

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

    this.router.post('/', (req, res) => { this.store(req, res); });
  }

  /**
   * Store a new review to the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} json of newly saved review
   * @memberof ReviewsController
   */
  async store(req, res) {
    try {
      const recipe = await this.database.saveReview(req.params.recipeId, req.body.review);
      return res.sendSuccessResponse(recipe);
    } catch (e) {
      return res.sendFailedResponse(e.message);
    }
  }
}
