import { Router } from 'express';

/**
 * Controller to handle all recipe endpoint routes
 */
export default class RecipesController {
  /**
   * Initialize the class
   */
  constructor() {
    this.router = new Router();

    this.router.get('/', (req, res) => { this.index(req, res); });
  }
  /**
   * Return a list of all recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   */
  index(req, res) {
    this.something = 1;
    return res.json(['some response from the recipes controller']);
  }
}
