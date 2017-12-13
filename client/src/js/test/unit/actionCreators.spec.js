import nock from 'nock';
import faker from 'faker';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as actionCreators from './../../../js/store/actions/actionCreators';

const globalMock = {
  apiUrl: 'http://localhost:4080'
};

describe('actionCreators', () => {
  context('action creators that make GET API requests for recipes', () => {
    beforeEach(() => {
      globalMock.recipeStub = () => ({
        id: faker.random.uuid(),
        title: faker.lorem.sentence(),
        userId: faker.random.uuid(),
        description: faker.lorem.paragraph(),
        imageUrl: faker.image.imageUrl(),
        timeToCook: faker.random.number(),
        ingredients: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence()]),
        procedure: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence()]),
        User: {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          email: faker.internet.email(),
          about: faker.lorem.paragraph()
        },
        upvotersIds: [faker.random.uuid(), faker.random.uuid()],
        favoritersIds: [faker.random.uuid()],
        downvotersIds: [faker.random.uuid()]
      });

      globalMock.recipe1 = globalMock.recipeStub();
      globalMock.recipe2 = globalMock.recipeStub();

      globalMock.store = configureStore([thunk.withExtraArgument(globalMock.apiUrl)])(() => ({
        routing: {
          locationBeforeTransitions: {
            search: ''
          }
        },
        recipes: [],
        authUser: {
          user: {},
          access_token: faker.random.uuid()
        }
      }));
    });
    context('actionCreators.getRecipesCatalog', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).get('/recipes').reply(200, {
          status: 'success',
          data: {
            recipes: {
              recipes: [globalMock.recipe1, globalMock.recipe2],
              paginationMeta: {}
            }
          }
        });
      });
      it('Should dispatch NEW_RECIPE_CREATED action to store when called', async () => {
        const { getRecipesCatalog } = actionCreators;

        await globalMock.store.dispatch(getRecipesCatalog());
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('NEW_RECIPE_CREATED');
        expect(storeActions[0].payload.title).to.equal(globalMock.recipe1.title);
        expect(storeActions[1].type).to.equal('NEW_RECIPE_CREATED');
        expect(storeActions[1].payload.title).to.equal(globalMock.recipe2.title);
      });
    });

    context('actionCreators.getHomePageData', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).get('/frontend/home').reply(200, {
          status: 'success',
          data: {
            latestRecipes: [globalMock.recipe1, globalMock.recipe2],
            mostFavoritedRecipes: [globalMock.recipe1, globalMock.recipe2]
          }
        });
      });
      it('should dispatch NEW_RECIPE_CREATED to store when called', async () => {
        const { getHomePageData } = actionCreators;

        await globalMock.store.dispatch(getHomePageData());
        const storeActions = globalMock.store.getActions();

        expect(storeActions.length).to.equal(4);
        expect(storeActions[0].type).to.equal('NEW_RECIPE_CREATED');
        expect(storeActions[0].payload.id).to.equal(globalMock.recipe1.id);
      });
    });

    context('actionCreators.changeRouterQueryParams', () => {
      it('should dispatch action to change route query params', async () => {
        const { changeRouterQueryParams } = actionCreators;

        await globalMock.store.dispatch(changeRouterQueryParams('query', 'sandwich', {
          query: {}
        }));
        const storeActions = globalMock.store.getActions();
        expect(storeActions[0].type).to.equal('@@router/CALL_HISTORY_METHOD');
        expect(storeActions[0].payload.method).to.equal('push');
      });
    });
    context('actionCreators.toggleUpvote', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).post(`/recipes/${globalMock.recipe1.id}/upvote`).reply(200, {});
      });
      it('Should dispatch action to add user to upvotes if user has not upvoted.', async () => {
        const { toggleUpvote } = actionCreators;

        await globalMock.store.dispatch(toggleUpvote(0, false, false, 0, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('ADD_USER_TO_UPVOTERS');
        expect(storeActions[0].payload.indexOfRecipe).to.equal(0);
      });
      it('Should dispatch action to remove user from upvotes if user has upvoted.', async () => {
        const { toggleUpvote } = actionCreators;

        await globalMock.store.dispatch(toggleUpvote(0, true, false, 0, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('REMOVE_USER_FROM_UPVOTERS');
        expect(storeActions[0].payload.indexOfRecipe).to.equal(0);
      });
      it('Should dispatch action to remove user from downvotes if user has downvoted.', async () => {
        const { toggleUpvote } = actionCreators;

        await globalMock.store.dispatch(toggleUpvote(0, false, true, 0, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[1].type).to.equal('REMOVE_USER_FROM_DOWNVOTERS');
        expect(storeActions[1].payload.indexOfRecipe).to.equal(0);
      });
    });
    context('actionCreators.toggleDownvote', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).post(`/recipes/${globalMock.recipe1.id}/downvote`).reply(200, {});
      });
      it('Should dispatch action to add user to downvotes if user has not downvoted.', async () => {
        const { toggleDownvote } = actionCreators;

        await globalMock.store.dispatch(toggleDownvote(0, false, false, 0, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('ADD_USER_TO_DOWNVOTERS');
        expect(storeActions[0].payload.indexOfRecipe).to.equal(0);
      });
      it('Should dispatch action to remove user from downvotes if user has downvoted.', async () => {
        const { toggleDownvote } = actionCreators;

        await globalMock.store.dispatch(toggleDownvote(0, true, true, 0, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('REMOVE_USER_FROM_DOWNVOTERS');
        expect(storeActions[0].payload.indexOfRecipe).to.equal(0);
      });
      it('Should dispatch action to remove user from downvotes if user has downvoted.', async () => {
        const { toggleDownvote } = actionCreators;

        await globalMock.store.dispatch(toggleDownvote(0, true, true, 0, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('REMOVE_USER_FROM_DOWNVOTERS');
        expect(storeActions[0].payload.indexOfRecipe).to.equal(0);
      });
    });
  });
});
