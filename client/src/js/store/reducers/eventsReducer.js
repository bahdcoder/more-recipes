export default (state = {}, action) => {
  switch (action.type) {
    case 'TRIGGER_GET_RECIPES_CATALOG':
      return {
        message: 'TRIGGER_GET_RECIPES_CATALOG'
      };
    default:
      return state;
  }
};
