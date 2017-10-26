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
    this.router.delete('/:id', (req, res) => { this.delete(req, res); });
  }
  /**
   * Return a list of all recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  index(req, res) {
    return res.sendSuccessResponse({ recipes: this.database.recipes });
  }
  /**
   * Store a new recipe into the database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of newly created recipe
   * @memberof RecipesController
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
   * @memberof RecipesController
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

  /**
   * Delete a recipe from the database
   * @param {any} req express request object
   * @param {any} res express response object
   * @returns {json} confirmation message
   * @memberof RecipesController
   */
  async delete(req, res) {
    try {
      await this.database.delete(req.params.id);
      return res.sendSuccessResponse('Recipe deleted.', 200);
    } catch (e) {
      return res.sendFailureResponse(e.message);
    }
  }
}
