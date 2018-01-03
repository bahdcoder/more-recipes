import { AUTHENTICATION_SUCCESS } from '../../actions/auth/authActions';
/**
 * Handle all authentication actions
 * @param {obj} state the current authentication state in store
 * @param {obj} action redux action
 * @returns {obj} new state
 */
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return [
        ...state,
        { ...action.payload.user }
      ];
    default:
      return state;
  }
};

export default usersReducer;
