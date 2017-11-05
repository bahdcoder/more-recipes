/* eslint-disable */
import { expect } from 'chai';
import Validators from './../../validators'

describe('StoreReviewValidator', () => {
  describe('validateReview', () => {
    it('Should return `The review is required.` if the review is not provided', () => {
      const validator = new Validators.StoreReviewValidator();

      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.not.be.empty;
      expect(validator.errors).to.include.members(['The review is required.']);
    });
    it('Should return `The review must be longer than 5 characters.` if the review is not long enough', () => {
      const validator = new Validators.StoreReviewValidator('REVI');

      expect(validator.isValid()).to.be.false;
      expect(validator.errors).to.not.be.empty;
      expect(validator.errors).to.include.members(['The review must be longer than 5 characters.']);
    });
    
  });
});
