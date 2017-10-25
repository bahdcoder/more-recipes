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
    return res.json([{
      title: 'Eba and fried stew',
      time_to_cook: 45,
      description: 'Eba and fried stew description',
      ingredients: ['garri', 'sugar', 'stew', 'salt', 'maggi', 'pepper', 'red oil'],
      procedure: ['mix', 'fry it'],
      upvotes: 40,
      downvotes: 54,
      favorites: 2343,
      author: {
        name: 'Kati Frantz'
      }
    }]);
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
   * Update a recipe
   * @param {object} req express response object
   * @param {object} res express request object
   * @returns {json} ok confirm code
   */
  update(req, res) {
    this.something = 1;
    return res.status(201).json({ id: req.params.id });
  }
  /**
   * Delete a recipe
   * @param {object} req express response object
   * @param {object} res express request object
   * @returns {json} ok status confirmation
   */
  delete(req, res) {
    this.something = 1;
    return res.status(201).json({ id: req.params.id });
  }
  /**
   * Register the routes for this controller
   * @returns {null} null
   */
  registerControllerRoutes() {
    this.router.get('/', (req, res) => { this.index(req, res); });
    this.router.post('/', (req, res) => { this.store(req, res); });
    this.router.put('/:id', (req, res) => { this.update(req, res); });
    this.router.delete('/:id', (req, res) => { this.delete(req, res); });
  }
}
