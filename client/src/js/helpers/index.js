import lockr from 'lockr';
import axios from 'axios';


/**
 * Check if an email is of valid format
 * @param {string} email the email to check validity for
 * @returns {bool} true or false
 */
export const isValidEmail = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

export const isAuthenticated = (state) => {
  const { authUser } = state;
  if (authUser) {
    return true;
  }

  return false;
};

/**
 * Set default axios configurations
 * @param {object} authUser auth user
 * @returns {null} null
 */
export const setAxios = (authUser) => {
  if (authUser) {
    axios.defaults.headers.common['x-access-token'] = authUser.access_token;
  }
};
