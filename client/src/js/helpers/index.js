/**
 * Check if an email is of valid format
 * @param {string} email the email to check validity for
 * @returns {bool} true or false
 */
export const isValidEmail = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

export const isAuthenticated = (state) => {
  const authUser = state.authUser;
  if (authUser) {
    return true;
  }

  return false;
};
