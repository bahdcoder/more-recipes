/**
 * The reducer for the authentication endpoints
 *
 * @param {any} [state=[]] The default state for this reducer
 * @param {obj} action the action to be dispatched
 * @returns {object} the next state of the store tree
 */
export default function authReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGN_IN_USER':
      return action.authUser;
    case 'SIGN_OUT_USER':
      return null;
    case 'AUTH_USER_UPDATED':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
