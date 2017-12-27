/* eslint-disable */
import faker from 'faker';
import { expect } from 'chai';
import recipeStub from './../stubs/recipeStub';
import recipesReducer from './../../store/reducers/recipesReducer';

const globalMock = {};
describe('The recipesReducer', () => {
  beforeEach(() => {
    globalMock.recipeA = recipeStub();
    globalMock.recipeB = recipeStub();
  });
  it('should return the initial state', () => {
    const state = recipesReducer(undefined, {});

    expect(state).to.have.members([]);
  });
  context('recipesReducer.NEW_RECIPE_CREATED', () => {
    it('Should add a recipe to the redux store', () => {
      const initialState = [
        globalMock.recipeA
      ];

      const newState = recipesReducer(initialState, {
        type: 'NEW_RECIPE_CREATED',
        payload: globalMock.recipeB
      });

      expect(newState.length).to.equal(2);
      expect(newState[0].id).to.equal(globalMock.recipeA.id);
      expect(newState[1].id).to.equal(globalMock.recipeB.id);      
    });
  });

  context('recipesReducer.RECIPE_UPDATED', () => {
    it('Should update a recipe in the redux store', () => {
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

      expect(newState.length).to.equal(2);
      expect(newState[0].id).to.equal(globalMock.recipeA.id);
      expect(newState[1].id).to.equal(recipe.id);
    });
  });

  context('recipesReducer.ADD_USER_TO_UPVOTERS', () => {
    it('Should add user id to upvoters array of a recipe', () => {
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

      expect(newState.length).to.equal(1);
      expect(newState[0].upvotersIds.includes(fakeUserId)).to.be.true;
      expect(newState[0].upvotersIds.length).to.equal(globalMock.recipeA.upvotersIds.length + 1);
    });
  });

  context('recipesReducer.ADD_USER_TO_DOWNVOTERS', () => {
    it('Should add a user id to the downvoters for a recipe', () => {
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
  
      expect(newState.length).to.equal(1);
      expect(newState[0].downvotersIds.includes(fakeUserId)).to.be.true;
      expect(newState[0].downvotersIds.length).to.equal(globalMock.recipeA.downvotersIds.length + 1);``
    });
  });

  context('recipesReducer.REMOVE_USER_FROM_UPVOTERS', () => {
    it('Should remove a user id from upvotersIds array of the recipe', () => {
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
  
      expect(newState.length).to.equal(1);
      expect(newState[0].upvotersIds.includes(fakeUserId)).to.be.false;
      expect(newState[0].upvotersIds.length).to.equal(initialState[0].upvotersIds.length - 1);
    });
  });

  context('recipesReducer.REMOVE_USER_FROM_DOWNVOTERS', () => {
    it('Should remove a user id from downvoterIds array of the recipe', () => {
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
  
      expect(newState.length).to.equal(1);
      expect(newState[0].downvotersIds.includes(fakeUserId)).to.be.false;
      expect(newState[0].downvotersIds.length).to.equal(initialState[0].downvotersIds.length - 1);
    });
  });

  context('recipesReducer.REMOVE_USER_FROM_FAVORITERS', () => {
    it('Should remove a user id from favoritersIds array of the recipe', () => {
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
  
      expect(newState.length).to.equal(1);
      expect(newState[0].favoritersIds.includes(fakeUserId)).to.be.false;
      expect(newState[0].favoritersIds.length).to.equal(initialState[0].favoritersIds.length - 1);
    });
  });

  context('recipesReducer.ADD_USER_TO_FAVORITERS', () => {
    it('Should add user id to upvoters array of a recipe', () => {
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

      expect(newState.length).to.equal(1);
      expect(newState[0].favoritersIds.includes(fakeUserId)).to.be.true;
      expect(newState[0].favoritersIds.length).to.equal(globalMock.recipeA.favoritersIds.length + 1);
    });
  });
});
