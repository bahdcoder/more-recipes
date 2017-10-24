import { Router } from 'express';

/**
 * The recipes controller
 */
export default class RecipeController {
  /**
   * Initialize the controller
   */
  constructor() {
    this.router = new Router();
    this.registerControllerRoutes();
  }
  /**
   * Get all recipess
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json of recipes
   */
  index(req, res) {
    this.something = 1;
    return res.json(['some', ' json', ' from', ' recipes', ' index', ' controller']);
  }
  /**
   * Store a new recipe
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} ok confirmation status code
   */
  store(req, res) {
    this.something = 1;
    return res.status(201).json(['some data']);
  }
  /**
   * Register the routes for this controller
   * @returns {null} null
   */
  registerControllerRoutes() {
    this.router.get('/', (req, res) => { this.index(req, res); });
    this.router.post('/', (req, res) => { this.store(req, res); });
  }
}
