/* eslint-disable */
import { expect } from 'chai';
import Validators from './../../validators'

describe('StoreRecipesValidator', () => {
  describe('validateTitle', () => {
    it('Should return `The title is required.` if the title is not provided', () => {
      const validator = new Validators.StoreRecipeValidator({ description: 'description' });

      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.not.be.empty;
      expect(validator.errors).to.include.members(['The title is required.']);
    });

    it('Should return `The title must be longer than 5 characters.` if the title is a short one', () => {
      const validator = new Validators.StoreRecipeValidator({ title: 'ABCD' });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.not.be.empty;
      expect(validator.errors).to.include.members(['The title must be longer than 5 characters.']);
    });
  });

  describe('isValid', () => {
    it('Should return `No recipe was provided.` if no data is passed in request', () => {
      const validator = new Validators.StoreRecipeValidator();

      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['No recipe was provided.']);
    });
  });

  describe('validateDescription', () => {
    it('Should return `The description is required.` if the description is not provided', () => {
      const validator = new Validators.StoreRecipeValidator({});

      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The description is required.']);
    });
    it('Should return `The description must be longer than 5 characters.` if the description is not provided', () => {
      const validator = new Validators.StoreRecipeValidator({ description: 'DESC' });

      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The description must be longer than 5 characters.']);
    });
  });

  describe('validateTimeToCook', () => {
    it('Should return `The time to cook is required.` if the time to cook is not provided', () => {
      const validator = new Validators.StoreRecipeValidator({});
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The time to cook is required.']);
    });
    it('Should return `The time to cook must be a number in minutes.` if the time to cook is not a number', () => {
      const validator = new Validators.StoreRecipeValidator({ timeToCook: 'NOT_A_NUMBER' });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The time to cook must be a number in minutes.']);
    });
  });

  describe('validateIngredients', () => {
    it('Should return `The ingredients must be a json list of ingredients.` if the data passed is not a json', () => {
      const validator = new Validators.StoreRecipeValidator({ ingredients: "NOT_A_JSON" });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The ingredients must be a json list of ingredients.']);
    });
    it('Should return `There must be a list of ingredients.` if the data passed is json, but not an array', () => {
      const validator = new Validators.StoreRecipeValidator({ ingredients: `{"not_array":"json"}` });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['There must be a list of ingredients.']);
    });

    it('Should return `There must be at least one ingredient.` if the data passed is a json empty array', () => {
      const validator = new Validators.StoreRecipeValidator({ ingredients: JSON.stringify([]) });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['There must be at least one ingredient.']);
    });

    it('Should return `The ingredients are required.` if no ingredients are passed', () => {
      const validator = new Validators.StoreRecipeValidator({});
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The ingredients are required.']);
    });
  });

  describe('validateProcedure', () => {
    it('Should return `The procedure must be a json of procedural steps` if the data passed is not a json', () => {
      const validator = new Validators.StoreRecipeValidator({ procedure: "NOT_A_JSON" });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The procedure must be a json of procedural steps.']);
    });
    it('Should return `There must be a list of procedure steps.` if the data passed is json, but not an array', () => {
      const validator = new Validators.StoreRecipeValidator({ procedure: `{"not_array":"json"}` });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['There must be a list of procedure steps.']);
    });

    it('Should return `There must be at least one procedure step.` if the data passed is a json empty array', () => {
      const validator = new Validators.StoreRecipeValidator({ procedure: JSON.stringify([]) });
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['There must be at least one procedure step.']);
    });

    it('Should return `The procedure is required.` if no procedure is passed', () => {
      const validator = new Validators.StoreRecipeValidator({});
      
      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.include.members(['The procedure is required.']);
    });
  });
});