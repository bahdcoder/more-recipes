/**
 * Validates the data for creating a recipe
 * 
 * @export
 * @class CreateRecipeValidator
 */
export default class CreateRecipeValidator {
  /**
   * Creates an instance of CreateRecipeValidator.
   * @param {any} formData the form data to validate
   * @memberof CreateRecipeValidator
   */
  constructor(recipe) {
    this.recipe = recipe;
    this.errors = {};
    this.errors.title = [];
    this.errors.description = [];
    this.errors.timeToCook = [];
  }

  /**
   * Check if the validation is valid
   * 
   * @returns 
   * @memberof CreateRecipeValidator
   */
  isValid() {
    this.validateTitle();
    this.validateDescription();
    this.validateTimeToCook();

    if (this.errors.title.length > 0 || 
      this.errors.description.length > 0 || 
      this.errors.timeToCook.length > 0
    ) {
      return false;
    }

    return true;
  }

  /**
   * Validate the title creation
   * 
   * @memberof CreateRecipeValidator
   */
  validateTitle() {
    if (this.recipe.title) {
      if (this.recipe.title.length < 5) {
        this.errors['title'].push('The title must be longer than 5 characters.');
      }
    } else {
      this.errors['title'].push('The title is required.');
    }
  }

    /**
   * Validate the description field of the request
   * It must be found in request, and it must be longer than 5 characters
   * @returns {null} no return value
   */
  validateDescription() {
    if (this.recipe.description) {
      if (this.recipe.description.length < 5) {
        this.errors['description'].push('The description must be longer than 5 characters.');
      }
    } else {
      this.errors['description'].push('The description is required.');
    }
  }

  /**
   * Validate the time to cook field
   * @returns {null} null
   */
  validateTimeToCook() {
    if (this.recipe.timeToCook) {
      if (Number.isNaN(parseInt(this.recipe.timeToCook, 10))) {
        this.errors.timeToCook.push('The time to cook must be a number in minutes.');
      }
    } else {
      this.errors.timeToCook.push('The time to cook is required.');
    }
  }
}