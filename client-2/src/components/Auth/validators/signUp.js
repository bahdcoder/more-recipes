const validateSignUp = ({
  password,
  email,
  name,
  confirmPassword
}) => {
  const errors = {};
  if (!name) {
    errors.name = 'Your full name is required.';
  } else if (name.length < 8) {
    errors.name = 'Your full name must be 8 characters or more.';
  }
  if (!email) {
    errors.email = 'Your email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'The password is required.';
  } else if (password.length < 6) {
    errors.password = 'The password must be more than six characters long.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'The password confirmation is required.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'The password confirmation does not match.';
  }
  return errors;
};

export default validateSignUp;
