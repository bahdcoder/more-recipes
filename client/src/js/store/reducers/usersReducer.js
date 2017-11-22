
/**
 * Reducer for handling users in store
 *
 * @export
 * @param {array} [state=[]] initial state
 * @param {obj} action action to be performed on state
 * @returns {array} state
 */
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case 'NEW_USER_ADDED':
      return [
        ...state,
        action.payload
      ];
    case 'USER_UPDATED':
      return state.map((user, index) => {
        if (index !== action.payload.index) {
          return user;
        }

        return action.payload.user;
      });
    default:
      return state;
  }
}
