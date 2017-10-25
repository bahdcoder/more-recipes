import { Router } from 'express';
import Validators from './../validators';

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
    this.router.post('/', (req, res) => { this.store(req, res); });
  }
  /**
   * Return a list of all recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   */
  index(req, res) {
    this.something = 1;
    return res.sendSuccessResponse({ recipes: ['recipe1', 'recipe2'] });
  }
  /**
   * Store a new recipe into the database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created recipe
   */
  store(req, res) {
    this.some = 1;
    const validator = new Validators.StoreRecipeValidator(req.body);

    if (!validator.isValid()) {
      return res.sendFailureResponse({ errors: validator.errors });
    }

    return res.json(['some response from the recipes controller after creating recipe']);
  }
}
