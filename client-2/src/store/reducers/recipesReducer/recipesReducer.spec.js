/* global expect */
import recipesReducer from './index';
import mockRecipes from '../../../mock/recipes.json';
import { fetchHomePageDataFulfilled } from '../../actions/recipes/index';

describe('the recipesReducer', () => {
  describe('FETCH_HOME_PAGE_DATA_FULFILLED', () => {
    it('should return a default state if no matching action is found', () => {
      const state = recipesReducer(undefined, {});

      expect(state).toEqual([]);
    });
    it('should return a new array of items given an action', () => {
      const initialState = [mockRecipes[0]];

      const newState = recipesReducer(initialState, fetchHomePageDataFulfilled([mockRecipes[1]]));

      expect(newState.length).toEqual(2);
      expect(newState[1].id).toEqual(mockRecipes[1].id);
    });
  });
});

