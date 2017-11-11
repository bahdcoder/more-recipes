/* eslint-disable */
import { expect } from 'chai';
import validators from '../../validators';
import models from '../../database/models';

describe('RegisterUserValidation', () => {
  describe('validateEmail', () => {
    it('Should return the `The email is required` if there is no email provided', async () => {
      const validator = new validators.RegisterUserValidator({
        name: 'kati frantz',
        password: 'password'
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.include('The email is required.');
    });

    it('Should return the `The email must be a valid email address.` if the email provided is not valid', async () => {
      const validator = new validators.RegisterUserValidator({
        email: 'kati@frantz',
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.include('The email must be a valid email address.');
    });

    it('Should return make sure name and password are at least 5 characters long', async () => {
      const validator = new validators.RegisterUserValidator({
        name: 'kati',        
        email: 'valid@email-address.com',
        password: 'pass'
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.have.members([
        'The name must be longer than 5 characters.',
        'The password must be longer than 5 characters.'
      ]);
    });

    it('Should return the `A user with this email already exists.` if the email provided is already taken valid', async () => {
      await models.User.create({ 
        name: 'kati frantz',
        email: 'john@kenedy.com', 
        password: 'password'
       });
      
      const validator = new validators.RegisterUserValidator({
        email: 'kati@frantz.com',
      });
  
      const isValid = await validator.isValid();
      expect(isValid).to.be.false;
      expect(validator.errors).to.include('A user with this email already exists.');
    });
  });
});