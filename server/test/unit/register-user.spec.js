/* eslint-disable */
import { expect } from 'chai';
import models from '../../server/database/models';
import RegisterUserValidator from './../../server/validators/register-user.validator';

describe('RegisterUserValidation', () => {
  describe('validateEmail', () => {
    it('Should return the `The email is required` if there is no email provided', async () => {
      const validator = new RegisterUserValidator({
        name: 'kati frantz',
        password: 'password'
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.include('The email is required.');
    });

    it('Should return the `The email must be a valid email address.` if the email provided is not valid', async () => {
      const validator = new RegisterUserValidator({
        email: 'kati@frantz',
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.include('The email must be a valid email address.');
    });

    it.skip('Should return the `A user with this email already exists.` if the email provided is already taken valid', async () => {
      await models.User.create({ 
        name: 'kati frantz',
        email: 'kati@frantz.com', 
        password: 'password'
       });
      
      const validator = new RegisterUserValidator({
        email: 'kati@frantz.com',
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.include('A user with this email already exists.');
    });
  });
});