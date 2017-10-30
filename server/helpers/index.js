/**
 * Helper methods to use throughout the app
 */

/**
 * Check if an email is of valid format
 * @param {string} email the email to check validity for
 * @returns {bool} true or false
 */
const isValidEmail = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

export default isValidEmail;
