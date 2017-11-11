/**
 * The reducer for the authentication endpoints
 *
 * @param {any} [state=[]] The default state for this reducer
 * @param {obj} action the action to be dispatched
 * @returns {object} the next state of the store tree
 */
export default function authReducer(state = [], action) {
  //  console.log(AUTH_USER);
  switch (action.type) {
    case 'SIGN_IN_USER':
        let newState = state;
        newState = action.authUser;
        return newState;
      break;
    default:
      return state;
      break;
  }
  return state;
};