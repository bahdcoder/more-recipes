import { AUTHENTICATION_SUCCESS } from '../../actions/auth/authActions';
/**
 * Handle all authentication actions
 * @param {obj} state the current authentication state in store
 * @param {obj} action redux action
 * @returns {obj} new state
 */
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return {
        accessToken: action.payload.access_token,
        authUserId: action.payload.user.id
      };
    default:
      return state;
  }
};

export default authReducer;
