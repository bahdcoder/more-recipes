/* eslint-disable */
import faker from 'faker';
import recipeStub from './../stubs/recipeStub';
import recipesReducer from './../../store/reducers/recipesReducer';

const globalMock = {};
describe('The recipesReducer', () => {
  beforeEach(() => {
    globalMock.recipeA = recipeStub();
    globalMock.recipeB = recipeStub();
  });
  test('should return the initial state', () => {
    const state = recipesReducer(undefined, {});

    expect(state).toEqual(expect.arrayContaining([]));
  });
  describe('recipesReducer.NEW_RECIPE_CREATED', () => {
    test('Should add a recipe to the redux store', () => {
      const initialState = [
        globalMock.recipeA
      ];

      const newState = recipesReducer(initialState, {
        type: 'NEW_RECIPE_CREATED',
        payload: globalMock.recipeB
      });

      expect(newState.length).toBe(2);
      expect(newState[0].id).toBe(globalMock.recipeA.id);
      expect(newState[1].id).toBe(globalMock.recipeB.id);      
    });
  });

  describe('recipesReducer.RECIPE_UPDATED', () => {
    test('Should update a recipe in the redux store', () => {
      const initialState = [
        globalMock.recipeA,
        globalMock.recipeB
      ];

      const recipe = recipeStub();

      const newState = recipesReducer(initialState, {
        type: 'RECIPE_UPDATED',
        payload: {
          recipeIndex: 1,
          recipe 
        }
      });

      expect(newState.length).toBe(2);
      expect(newState[0].id).toBe(globalMock.recipeA.id);
      expect(newState[1].id).toBe(recipe.id);
    });
  });

  describe('recipesReducer.ADD_USER_TO_UPVOTERS', () => {
    test('Should add user id to upvoters array of a recipe', () => {
      const initialState = [
        globalMock.recipeA
      ];

      const fakeUserId = faker.random.uuid();

      const newState = recipesReducer(initialState, {
        type: 'ADD_USER_TO_UPVOTERS',
        payload: {
          indexOfRecipe: 0,
          userId: fakeUserId
        }
      });

      expect(newState.length).toBe(1);
      expect(newState[0].upvotersIds.includes(fakeUserId)).toBe(true);
      expect(newState[0].upvotersIds.length).toBe(globalMock.recipeA.upvotersIds.length + 1);
    });
  });

  describe('recipesReducer.ADD_USER_TO_DOWNVOTERS', () => {
    test('Should add a user id to the downvoters for a recipe', () => {
      const initialState = [
        globalMock.recipeA
      ];
  
      const fakeUserId = faker.random.uuid();
  
      const newState = recipesReducer(initialState, {
        type: 'ADD_USER_TO_DOWNVOTERS',
        payload: {
          indexOfRecipe: 0,
          userId: fakeUserId
        }
      });
  
      expect(newState.length).toBe(1);
      expect(newState[0].downvotersIds.includes(fakeUserId)).toBe(true);
      expect(newState[0].downvotersIds.length).toBe(globalMock.recipeA.downvotersIds.length + 1);``
    });
  });

  describe('recipesReducer.REMOVE_USER_FROM_UPVOTERS', () => {
    test('Should remove a user id from upvotersIds array of the recipe', () => {
      const fakeUserId = faker.random.uuid();

      const initialState = [{
        ...globalMock.recipeA,
        upvotersIds: [
          fakeUserId
        ]
      }];
  
      const newState = recipesReducer(initialState, {
        type: 'REMOVE_USER_FROM_UPVOTERS',
        payload: {
          indexOfRecipe: 0,
          indexOfUpvoter: 0
        }
      });
  
      expect(newState.length).toBe(1);
      expect(newState[0].upvotersIds.includes(fakeUserId)).toBe(false);
      expect(newState[0].upvotersIds.length).toBe(initialState[0].upvotersIds.length - 1);
    });
  });

  describe('recipesReducer.REMOVE_USER_FROM_DOWNVOTERS', () => {
    test('Should remove a user id from downvoterIds array of the recipe', () => {
      const fakeUserId = faker.random.uuid();

      const initialState = [{
        ...globalMock.recipeA,
        downvotersIds: [
          fakeUserId
        ]
      }];

      const newState = recipesReducer(initialState, {
        type: 'REMOVE_USER_FROM_DOWNVOTERS',
        payload: {
          indexOfRecipe: 0,
          indexOfDownvoter: 0
        }
      });
  
      expect(newState.length).toBe(1);
      expect(newState[0].downvotersIds.includes(fakeUserId)).toBe(false);
      expect(newState[0].downvotersIds.length).toBe(initialState[0].downvotersIds.length - 1);
    });
  });

  describe('recipesReducer.REMOVE_USER_FROM_FAVORITERS', () => {
    test('Should remove a user id from favoritersIds array of the recipe', () => {
      const fakeUserId = faker.random.uuid();

      const initialState = [{
        ...globalMock.recipeA,
        favoritersIds: [
          fakeUserId
        ]
      }];

      const newState = recipesReducer(initialState, {
        type: 'REMOVE_USER_FROM_FAVORITERS',
        payload: {
          indexOfRecipe: 0,
          indexOfFavoriter: 0
        }
      });
  
      expect(newState.length).toBe(1);
      expect(newState[0].favoritersIds.includes(fakeUserId)).toBe(false);
      expect(newState[0].favoritersIds.length).toBe(initialState[0].favoritersIds.length - 1);
    });
  });

  describe('recipesReducer.ADD_USER_TO_FAVORITERS', () => {
    test('Should add user id to upvoters array of a recipe', () => {
      const initialState = [
        globalMock.recipeA
      ];

      const fakeUserId = faker.random.uuid();

      const newState = recipesReducer(initialState, {
        type: 'ADD_USER_TO_FAVORITERS',
        payload: {
          indexOfRecipe: 0,
          userId: fakeUserId
        }
      });

      expect(newState.length).toBe(1);
      expect(newState[0].favoritersIds.includes(fakeUserId)).toBe(true);
      expect(newState[0].favoritersIds.length).toBe(globalMock.recipeA.favoritersIds.length + 1);
    });
  });
});
