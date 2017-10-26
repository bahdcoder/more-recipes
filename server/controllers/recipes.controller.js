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
    this.router.post('/:id/upvote', (req, res) => { this.upvote(req, res); });
    this.router.post('/:id/downvote', (req, res) => { this.downvote(req, res); });
  }
  /**
   * Return a list of all recipes
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  index(req, res) {
    const { recipes } = this.database;

    if (req.query.sort) {
      if (req.query.sort === 'upvotes') {
        if (req.query.order) {
          if (req.query.order === 'desc') {
            recipes.sort((recipe1, recipe2) => recipe1.upvotes < recipe2.upvotes);
          } else {
            recipes.sort((recipe1, recipe2) => recipe1.upvotes > recipe2.upvotes);
          }
        }
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
      return res.sendSuccessResponse({ message: 'Recipe deleted.' });
    } catch (e) {
      return res.sendFailureResponse(e.message);
    }
  }

  /**
   * Upvote a recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async upvote(req, res) {
    try {
      const recipe = await this.database.upvote(req.params.id);
      return res.sendSuccessResponse(recipe);
    } catch (e) {
      return res.sendFailureResponse(e.message, 404);
    }
  }

  /**
   * Upvote a recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async downvote(req, res) {
    try {
      const recipe = await this.database.downvote(req.params.id);
      return res.sendSuccessResponse(recipe);
    } catch (e) {
      return res.sendFailureResponse(e.message, 404);
    }
  }
}
