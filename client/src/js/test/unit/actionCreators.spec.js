/* eslint-disable */
import nock from 'nock';
import lockr from 'lockr';
import sinon from 'sinon';
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
    context('actionCreators.toggleFavorite', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).post(`/users/${globalMock.recipe1.id}/favorites`).reply(200, {});
      });
      it('Should dispatch REMOVE_USER_FROM_FAVORITERS if user has favorited recipe', async () => {
        const { toggleFavorite } = actionCreators;

        await globalMock.store.dispatch(toggleFavorite(0, true, 0, globalMock.recipe1.id));
        const storeActions = globalMock.store.getActions();

        expect(storeActions[0].type).to.equal('REMOVE_USER_FROM_FAVORITERS');
        expect(storeActions[0].payload).to.deep.equal({ indexOfRecipe: 0, indexOfFavoriter: 0 });
      });
    });

    context('actionCreators.signIn', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).post('/users/signin').reply(200, {
          status: 'success',
          data: {
            user: {
              id: faker.random.uuid(),
              settings: {
                reviewEmails: 1,
                favoriteModifiedEmail: 1
              },
              name: faker.name.findName(),
              email: faker.internet.email(),
              updatedAt: faker.date.past(),
              createdAt: faker.date.past(),
              recipes: [globalMock.recipeStub()]
            },
            access_token: faker.random.word()
          }
        });
      });
      it('should dispatch a SIGN_IN_USER action when called', async () => {
        const { signIn } = actionCreators;

        await globalMock.store.dispatch(signIn({
          email: faker.internet.email(),
          password: faker.random.word()
        }));

        const storeAction = globalMock.store.getActions()[0];
        expect(storeAction.type).to.equal('SIGN_IN_USER');
        expect(storeAction.authUser.user).to.not.be.undefined;
        expect(storeAction.authUser.access_token).to.not.be.undefined;
      });
    });

    context('actionCreators.signOut', () => {
      beforeEach(() => {
        globalMock.lockrStub = sinon.stub(lockr, 'rm');
      });
      it('should dispatch SIGN_OUT_USER action when called', async () => {
        const { signOut } = actionCreators;

        await globalMock.store.dispatch(signOut());
        const storeAction = globalMock.store.getActions()[0];
        expect(storeAction.type).to.equal('SIGN_OUT_USER');
        expect(globalMock.lockrStub.calledOnce).to.be.true;
      });
    });

    context('actionCreators.signUp', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).post('/users/signup').reply(200, {
          status: 'success',
          data: {
            user: {
              id: faker.random.uuid(),
              settings: {
                reviewEmails: 1,
                favoriteModifiedEmail: 1
              },
              name: faker.name.findName(),
              email: faker.internet.email(),
              updatedAt: faker.date.past(),
              createdAt: faker.date.past(),
              recipes: [globalMock.recipeStub()]
            },
            access_token: faker.random.word()
          }
        });
      });
      it('Should dispatch SIGN_IN_USER when called', async () => {
        const { signUp } = actionCreators;
        
        await globalMock.store.dispatch(signUp({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.random.word()
        }));

        const storeAction = globalMock.store.getActions()[0];
        expect(storeAction.type).to.equal('SIGN_IN_USER');
        expect(globalMock.lockrStub.calledOnce).to.be.true;
      });
    });

    context('actionCreators.createRecipe', () => {
      beforeEach(() => {
        nock(globalMock.apiUrl).post('/recipes').reply(200, {
          status: 'success',
          data: {
            recipe: globalMock.recipeStub()
          }
        });
      });
      it('Should dispatch NEW_RECIPE_CREATED action to store when called', async () => {
        const { createRecipe } = actionCreators;

        await globalMock.store.dispatch(createRecipe());
        const storeAction = globalMock.store.getActions()[0];

        expect(storeAction.type).to.equal('NEW_RECIPE_CREATED');
        expect(storeAction.payload.id).to.not.be.undefined;
        expect(storeAction.payload.title).to.not.be.undefined;
      });
    });
  });
});
