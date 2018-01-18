import validateLogin from './login';

describe('The validateLogin function', () => {
  it('Should return validation errors if email is not provided', () => {
    const errors = validateLogin({});

    expect(errors.email).toBe('Your email is required.');
  });
  it('should return validation error if email provided is not valid', () => {
    expect(validateLogin({ email: 'SOME_INVALID_EMAIL' }).email).toBe('Invalid email address');
  });
  it('should return validation error if no passwoord is provided', () => {
    expect(validateLogin({}).password).toBe('The password is required.');
  });
});
