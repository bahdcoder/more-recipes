const validateLogin = ({
  password,
  email
}) => {
  const errors = {};
  if (!email) {
    errors.email = 'Your email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'The password is required.';
  }

  return errors;
};

export default validateLogin;
