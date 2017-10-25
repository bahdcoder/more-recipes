/**
 * Validate the data for storing a new recipe
 */
export default class StoreRecipeValidator {
  /**
   * Initialize the data to be validated
   * @param {object} recipe the recipe to be validated
   */
  constructor(recipe) {
    this.recipe = recipe;
    this.errors = [];
  }
  /**
   * Validate the recipe
   * @returns {boolean} true or false
   */
  isValid() {
    if (this.recipe) {
      this.validateTitle();
      this.validateDescription();
      this.validateTimeToCook();
      this.validateIngredients();
      this.validateProcedure();
    } else {
      this.errors.push('No recipe was provided');
    }

    if (this.errors.length > 0) {
      return false;
    }

    return true;
  }
  /**
   * Validate the name field of the request
   * It must be found in request, and it must not be an empty string
   * @returns {null} no return value
   */
  validateTitle() {
    if (!this.recipe.title) {
      this.errors.push('The title is required.');
    }
    if (this.recipe.title && this.recipe.title.length < 1) {
      this.errors.push('The title must not be an empty string');
    }
  }
  /**
   * Validate the name field of the request
   * It must be found in request, and it must
   * @returns {null} no return value
   */
  validateDescription() {
    if (!this.recipe.description) {
      this.errors.push('The description is required.');
    }

    if (this.recipe.description && this.recipe.description.length < 1) {
      this.errors.push('The description must not be an empty string');
    }
  }
  /**
   * Validate the time to cook field
   * @returns {null} null
   */
  validateTimeToCook() {
    if (!this.recipe.time_to_cook) {
      this.errors.push('The time to cook is required.');
    }

    if (this.recipe.time_to_cook && Number.isInteger(parseInt(this.recipe.time_to_cook, 10))) {
      this.errors.push('The time to cook must be a number in minutes.');
    }
  }
  /**
   * Validate the ingredients field
   * @returns {null} no return
   */
  validateIngredients() {
    const { ingredients } = this.recipe;

    if (!ingredients) {
      this.errors.push('The ingredients are required.');
    }

    if (ingredients && !Array.isArray(ingredients)) {
      this.errors.push('There must be a list of ingredients');
    }

    if (ingredients && Array.isArray(ingredients) && ingredients.length < 1) {
      this.errors.push('There must be at least one ingredient');
    }
  }
  /**
   * Validate the procedure field
   * @returns {null} no return
   */
  validateProcedure() {
    const { procedure } = this.recipe;

    if (!procedure) {
      this.errors.push('The procedure is required.');
    }

    if (procedure && !Array.isArray(procedure)) {
      this.errors.push('There must be a list of steps in the procedure');
    }

    if (procedure && Array.isArray(procedure) && procedure.length < 1) {
      this.errors.push('There must be at least one step for procedure.');
    }
  }
}
