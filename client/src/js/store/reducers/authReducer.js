/**
 * The reducer for the authentication endpoints
 *
 * @param {any} [state=[]] The default state for this reducer
 * @param {obj} action the action to be dispatched
 * @returns {object} the next state of the store tree
 */
export default function authReducer(state = [], action) {
  switch (action.type) {
    case 'SIGN_IN_USER':
        let newState = state;
        newState = action.authUser;
        return newState;
    break;
    case 'SIGN_OUT_USER': 
        let newState2 = state;
        newState2 = null;
        return newState2;
    break;
    default:
      return state;
    break;
  }
};
