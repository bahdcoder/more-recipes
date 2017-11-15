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
    default:
      return state;
  }
}
