import { Router } from 'express';
import Database from './../database';
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
    this.database = new Database();

    this.router.get('/', (req, res) => { this.index(req, res); });
    this.router.post('/', (req, res) => { this.store(req, res); });
    this.router.put('/:id', (req, res) => { this.update(req, res); });
  }
  /**
   * Return a list of all recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   */
  index(req, res) {
    return res.sendSuccessResponse({ recipes: this.database.recipes });
  }
  /**
   * Store a new recipe into the database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created recipe
   */
  async store(req, res) {
    const validator = new Validators.StoreRecipeValidator(req.body);

    if (!validator.isValid()) {
      return res.sendFailureResponse({ errors: validator.errors });
    }

    const recipe = await this.database.save(req.body);

    return res.sendSuccessResponse(recipe, 201);
  }
  /**
   * Update a recipe in storage
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json with updated recipe
   */
  async update(req, res) {
    const validator = new Validators.StoreRecipeValidator(req.body);

    if (!validator.isValid()) {
      return res.sendFailureResponse({ errors: validator.errors });
    }

    try {
      const recipe = await this.database.update(req.params.id, req.body);
      return res.sendSuccessResponse(recipe, 200);
    } catch (error) {
      return res.sendFailureResponse(error.message, 404);
    }
  }
}

