import { Router } from 'express';
import models from '../database/models';
import client from '../helpers/redis-client';
import middleware from '../middleware/index';
/**
 * Controller to handle all recipe endpoint routes
 */
export default class RecipesController {
  /**
   * Initialize the class
   */
  constructor() {
    this.router = new Router();

    this.defineRoutes();
  }
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

  /**
   * Upvote a recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json
   * @memberof RecipesController
   */
  async upvote(req, res) {
    try {
      const recipe = req.currentRecipe;

      await client.sadd(`recipe:${recipe.id}:upvotes`, req.authUser.id);

      return res.sendSuccessResponse({ message: 'Recipe upvoted!' });
    } catch (e) {
      return res.sendFailureResponse(e.message, 500);
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
      const recipe = req.currentRecipe;

      await client.sadd(`recipe:${recipe.id}:downvotes`, req.authUser.id);

      return res.sendSuccessResponse({ message: 'Recipe downvoted!' });
    } catch (e) {
      return res.sendFailureResponse(e.message, 500);
    }
  }
  /**
   * Define routes for this controller
   * @returns {null} null
   */
  defineRoutes() {
    this.router.get('/', this.index);
    this.router.post('/', middleware.auth, middleware.createRecipeValidator, this.create);
    this.router.put('/:id', middleware.auth, middleware.authorize, middleware.createRecipeValidator, this.update);
    this.router.delete('/:id', middleware.auth, middleware.authorize, this.destroy);
    this.router.post('/:id/upvote', middleware.auth, middleware.canUpvote, this.upvote);
    this.router.post('/:id/downvote', middleware.auth, middleware.canDownvote, this.downvote);
  }
}
