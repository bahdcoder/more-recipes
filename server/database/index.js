
import recipes from './db';
/**
 * Temporary json store interactor for now
 */
export default class Database {
  /**
   * Initialize the database records
   */
  constructor() {
    this.recipes = recipes;
  }

  /**
   * Dummy persist a record to database
   * @param {object} recipe recipe to be saved to database
   * @returns {Promise} promise with recipe
   */
  save(recipe) {
    return new Promise((resolve) => {
      recipe.id = this.generateRandomId();
      recipe.createdAt = new Date();
      recipe.updatedAt = new Date();
      recipe.upvotes = 0;
      recipe.downvotes = 0;
      recipe.favorites = 0;
      recipe.ingredients = JSON.parse(recipe.ingredients);
      recipe.procedure = JSON.parse(recipe.procedure);

      this.recipes.push(recipe);

      return resolve(recipe);
    });
  }
  /**
   * Dummy update a record to database
   * @param {object} recipeId id of recipe to be updated to database
   * @param {object} newRecipe the new data for the recipe from request
   * @returns {Promise} promise with recipe
   */
  update(recipeId, newRecipe) {
    return new Promise((resolve, reject) => {
      const recipe = this.findById(recipeId);
      if (!recipe) {
        return reject(Error('The record could not be found in the database.'));
      }

      recipe.title = newRecipe.title;
      recipe.description = newRecipe.description;
      recipe.time_to_cook = newRecipe.time_to_cook;
      recipe.updatedAt = new Date();
      recipe.ingredients = JSON.parse(newRecipe.ingredients);
      recipe.procedure = JSON.parse(newRecipe.procedure);

      this.recipes.splice(this.findIndexById(recipe.id), 1, recipe);

      return resolve(recipe);
    });
  }

  /**
   * Delete a recipe from storage
   * @param {number} recipeId id of recipe to be deleted
   * @returns {Promise} Promise
   * @memberof Database
   */
  delete(recipeId) {
    return new Promise((resolve, reject) => {
      const recipe = this.findById(recipeId);
      if (!recipe) {
        return reject(Error('Recipe was not found in the database.'));
      }

      this.recipes.splice(this.findIndexById(recipe.id), 1);

      return resolve('Recipe deleted.');
    });
  }

  /**
   * Find a recipe using its id
   * @param {any} recipeId id of recipe to find
   * @returns {object} recipe
   * @memberof Database
   */
  findById(recipeId) {
    return this.recipes.find(rec => rec.id === parseInt(recipeId, 10));
  }
  /**
   * Find index of a recipe using its id
   * @param {any} recipeId id of recipe to find
   * @returns {object} recipe
   * @memberof Database
   */
  findIndexById(recipeId) {
    return this.recipes.findIndex(rec => rec.id === parseInt(recipeId, 10));
  }

  /**
   * Save a review for a recipe
   * @param {any} recipeId recipe id
   * @param {string} review review to be saved
   * @returns {Promise} resolved with recipe, rejects with error
   * @memberof Database
   */
  saveReview(recipeId, review) {
    return new Promise((resolve, reject) => {
      const recipe = this.findById(recipeId);
      if (!recipe) {
        return reject(Error('The recipe was not found in the database.'));
      }

      recipe.reviews = [];
      recipe.reviews.push(review);
      return resolve(recipe);
    });
  }
  /**
   * Upvote a recipe
   * @param {Number} recipeId id of recipe to be upvoted
   * @returns {Promise} resolves with recipe
   * @memberof Database
   */
  upvote(recipeId) {
    return new Promise((resolve, reject) => {
      const recipe = this.findById(recipeId);
      if (!recipe) {
        return reject(Error('The recipe was not found in the database.'));
      }

      recipe.upvotes += 1;

      this.recipes.splice(this.findIndexById(recipe.id), 1, recipe);

      return resolve(recipe);
    });
  }

  /**
   * Downvote a recipe
   * @param {Number} recipeId id of recipe to be downvoted
   * @returns {Promise} resolves with recipe
   * @memberof Database
   */
  downvote(recipeId) {
    return new Promise((resolve, reject) => {
      const recipe = this.findById(recipeId);
      if (!recipe) {
        return reject(Error('The recipe was not found in the database.'));
      }

      recipe.downvotes += 1;

      this.recipes.splice(this.findIndexById(recipe.id), 1, recipe);

      return resolve(recipe);
    });
  }
  /**
   * Generates a random id for a newly created recipe
   * @returns {Number} number
   * @memberof Database
   */
  generateRandomId() {
    return Math.floor(Math.random() * (Math.ceil(10000) - Math.floor(5000))) + Math.floor(5000);
  }
}
