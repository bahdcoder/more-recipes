import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actionCreators from '../../store/actions/actionCreators';

const mockStore = configureMockStore([thunk]);

describe('Action Creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const mockMoxiosRequest = (statusCode, status = 'success', data) => {
    moxios.wait(() => {
      moxios.requests.mostRecent().respondWith({
        status: statusCode,
        response: {
          status,
          data
        }
      });
    });
  };

  const initialState = {
    routing: {
      locationBeforeTransitions: { search: '' }
    },
    recipes: [],
    authUser: { user: { id: 1, name: 'test user', email: 'test@user.com' } }
  };

  test('getRecipesCatalog should dispatch NEW_RECIPE_CREATED action for each recipe fetched', async () => {
    mockMoxiosRequest(200, 'success', { recipes: { recipes: [{ id: 1 }, { id: 2 }] } });
    const store = mockStore(initialState);
    await store.dispatch(actionCreators.getRecipesCatalog());
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_RECIPE_CREATED);
    expect(dispatchedActions[1].type).toBe(actionCreators.NEW_RECIPE_CREATED);
  });
  test('getHomePageData, should dispatch NEW_RECIPE_CREATED action for each recipe fetched', async () => {
    mockMoxiosRequest(200, 'success', { latestRecipes: [{ id: 1 }, { id: 2 }], mostFavoritedRecipes: [{ id: 3 }] });

    const store = mockStore(initialState);
    await store.dispatch(actionCreators.getHomePageData());
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(3);
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_RECIPE_CREATED);
    expect(dispatchedActions[1].type).toBe(actionCreators.NEW_RECIPE_CREATED);
  });

  test('getSingleRecipe should dispatch NEW_RECIPE_ADDED action after fetching recipe', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.getSingleRecipe(1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(1);
  });

  test('toggleUpvote should dispatch ADD_USER_TO_UPVOTERS if user has not upvoted', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.toggleUpvote(0, false, false, 0, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.ADD_USER_TO_UPVOTERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });
  test('toggleUpvote should dispatch REMOVE_USER_FROM_UPVOTERS if user has upvoted', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.toggleUpvote(0, true, false, 0, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.REMOVE_USER_FROM_UPVOTERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });
  test('toggleUpvote should dispatch REMOVE_USER_FROM_DOWNVOTERS if user has downvoted', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.toggleUpvote(0, true, true, 0, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(3);
    expect(dispatchedActions[0].type).toBe(actionCreators.REMOVE_USER_FROM_UPVOTERS);
    expect(dispatchedActions[2].type).toBe(actionCreators.REMOVE_USER_FROM_DOWNVOTERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });

  test('toggleDownvote should dispatch ADD_USER_TO_DOWNVOTERS if user has not upvoted', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.toggleDownvote(0, false, false, 0, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.ADD_USER_TO_DOWNVOTERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });
  test('toggleDownvote should dispatch REMOVE_USER_FROM_DOWNVOTERS if user has downvoted', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.toggleDownvote(0, false, true, 0, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.REMOVE_USER_FROM_DOWNVOTERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });
  test('toggleDownvote should dispatch REMOVE_USER_FROM_UPVOTERS if user has upvoted', async () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.toggleDownvote(0, true, true, 0, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(3);
    expect(dispatchedActions[0].type).toBe(actionCreators.REMOVE_USER_FROM_DOWNVOTERS);
    expect(dispatchedActions[2].type).toBe(actionCreators.REMOVE_USER_FROM_UPVOTERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });

  test('toggleFavorite should dispatch ADD_USER_TO_FAVORITES if user has not favorited recipe', () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    store.dispatch(actionCreators.toggleFavorite(0, false, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.ADD_USER_TO_FAVORITERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });

  test('toggleFavorite should dispatch REMOVE_USER_FROM_FAVORITERS if user has not favorited recipe', () => {
    mockMoxiosRequest(200, 'success', { recipe: { id: 1 } });

    const store = mockStore(initialState);

    store.dispatch(actionCreators.toggleFavorite(0, true, 0, 1));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.REMOVE_USER_FROM_FAVORITERS);
    expect(dispatchedActions[1].type).toBe(actionCreators.NOTIFICATION);
  });

  test('signIn should dispatch SIGN_IN_USER action', async () => {
    mockMoxiosRequest(200, 'success', { user: { id: 1 }, access_token: 'token' });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.signIn({ email: 'test@user.com', password: 'password' }));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.SIGN_IN_USER);
  });

  test('signOut should dispatch SIGN_OUT_USER action', async () => {
    const store = mockStore(initialState);

    await store.dispatch(actionCreators.signOut());
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(1);
    expect(dispatchedActions[0].type).toBe(actionCreators.SIGN_OUT_USER);
  });

  test('signUp should dispatch SIGN_IN_USER action', async () => {
    mockMoxiosRequest(200, 'success', { user: { id: 1 }, access_token: 'token' });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.signIn({ email: 'test@user.com', password: 'password' }));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.SIGN_IN_USER);
  });

  test('createRecipe should dispatch NEW_RECIPE_CREATED action', async () => {
    mockMoxiosRequest(200, 'success', { recipe: {} });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.createRecipe({}));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_RECIPE_CREATED);
  });

  test('updateRecipe should dispatch RECIPE_UPDATED action', async () => {
    mockMoxiosRequest(200, 'success', { recipe: {} });

    const store = mockStore(initialState);

    await store.dispatch(actionCreators.updateRecipe({}));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.RECIPE_UPDATED);
  });
  test('updateRecipesInStore should dispatch NEW_RECIPE_CREATED action', () => {
    const store = mockStore({
      ...initialState, users: []
    });

    store.dispatch(actionCreators.updateRecipesInStore({}));
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(1);
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_RECIPE_CREATED);
  });

  test.skip('getUserRecipes should dispatch NEW_RECIPE_CREATED and NEW_USER_ADDED action', async () => {
    mockMoxiosRequest(200, 'success', { recipes: [{ id: 1 }] });
    const store = mockStore({
      ...initialState, users: []
    });

    await store.dispatch(actionCreators.getUserRecipes());
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_RECIPE_CREATED);
    expect(dispatchedActions[1].type).toBe(actionCreators.NEW_USER_ADDED);
  });

  test('getRecipeReviews should dispatch NEW_REVIEWS_ADDED action', async () => {
    mockMoxiosRequest(200, 'success', { reviews: [] });
    const store = mockStore(initialState);

    await store.dispatch(actionCreators.getRecipeReviews());
    const dispatchedActions = store.getActions();

    expect(dispatchedActions.length).toBe(1);
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_REVIEWS_ADDED);
  });
  test('createReview should dispatch NEW_REVIEW_ADDED action', async () => {
    mockMoxiosRequest(200, 'success', { reviews: [] });
    const store = mockStore(initialState);

    await store.dispatch(actionCreators.createReview(1));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_REVIEW_ADDED);
  });
  test.skip('getUserFavorites should dispatch NEW_RECIPE_CREATED for all recipes found', async () => {
    mockMoxiosRequest(200, 'success', { favorites: [{ id: 1 }] });
    const store = mockStore(initialState);

    await store.dispatch(actionCreators.getUserFavorites());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_RECIPE_CREATED);
  });
  test('findUser should dispatch NEW_USER_ADDED action', async () => {
    mockMoxiosRequest(200, 'success', { user: { id: 1 } });
    const store = mockStore({
      ...initialState, users: []
    });

    await store.dispatch(actionCreators.findUser());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].type).toBe(actionCreators.NEW_USER_ADDED);
  });

  test('updateUserProfile should dispatch AUTH_USER_UPDATED and USER_UPDATED actions', async () => {
    mockMoxiosRequest(200, 'success', { user: { id: 1 } });
    localStorage.setItem('authUser', JSON.stringify({ user: { id: 1 }, access_token: 'token' }));
    const store = mockStore({
      ...initialState, users: []
    });

    await store.dispatch(actionCreators.updateUserProfile());
    const dispatchedActions = store.getActions();

    expect(dispatchedActions[0].type).toBe(actionCreators.USER_UPDATED);
    expect(dispatchedActions[1].type).toBe(actionCreators.AUTH_USER_UPDATED);
  });

  test('deleteRecipe should dispatch REMOVE_RECIPE action', async () => {
    mockMoxiosRequest(200, 'success', {});
    const store = mockStore({
      ...initialState, users: []
    });

    await store.dispatch(actionCreators.deleteRecipe());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].type).toBe(actionCreators.REMOVE_RECIPE);
  });

  test('checkAuth should return true when user is authenticated', () => {
    const store = mockStore(initialState);

    expect(store.dispatch(actionCreators.checkAuth())).toEqual(true);
  });

  test('checkAuth should return false when user is not authenticated', () => {
    const store = mockStore({
      ...initialState, authUser: null
    });

    expect(store.dispatch(actionCreators.checkAuth())).toEqual(false);
  });
  test('triggerGetRecipesCatalog should return false when user is not authenticated', () => {
    const store = mockStore(initialState);
    store.dispatch(actionCreators.triggerGetRecipesCatalog());

    const dispatchedActions = store.getActions();


    expect(dispatchedActions[0].type).toEqual(actionCreators.TRIGGER_GET_RECIPES_CATALOG);
  });
});
