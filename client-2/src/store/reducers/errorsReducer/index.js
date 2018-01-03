import { FETCH_HOME_PAGE_DATA_FAILED } from '../../actions/recipes/recipeActions';

const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_HOME_PAGE_DATA_FAILED:
      return state;
    default:
      return state;
  }
};

export default errorsReducer;
