import React from 'react';
import axios from 'axios';
import lockr from 'lockr';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { isAuthenticated, setAxios } from './helpers';

import store from './store';

import Home from './screens/pages/Home';
import Login from './screens/pages/Login';
import Recipes from './screens/pages/Recipes';
import Register from './screens/pages/Register';
import UserProfile from './screens/pages/UserProfile/UserProfile';
import UserRecipes from './screens/pages/UserRecipes/UserRecipes';
import SingleRecipe from './screens/pages/SingleRecipe/SingleRecipe';
import CreateRecipe from './screens/pages/CreateRecipe/createRecipe';
import UserFavorites from './screens/pages/UserFavorites/UserFavorites';

import '../css/bootstrap.min.css';
import '../css/animate.min.css';
import '../css/styles.css';
import '../css/app.scss';

import Main from './containers/Main';

setAxios(lockr.get('authUser'));
window.axios = axios;
/**
 * Check if the user is authenticated
 *
 * @param {obj} nextState Next router destination
 * @param {func} replace replace the next route
 * @returns {null} null
 */
const checkIfAuth = (nextState, replace) => {
  if (isAuthenticated(store.getState())) {
    return true;
  }

  replace({
    pathname: '/auth/login'
  });
};

/**
 * Check if the user is authenticated and authorized to visit this route
 *
 * @param {any} nextState Next router destination
 * @param {any} replace replace the next route
 * @returns {null} null
 */
const checkIfAuthorized = (nextState, replace) => {
  if (isAuthenticated(store.getState())) {
    const currentState = store.getState();
    const recipe = currentState.recipes.find(currentRecipe =>
      currentRecipe.id === nextState.params.id);

    if (!recipe) {
      // redirect user to the 404 page.
      replace({
        pathname: '/'
      });
    } else {
      if (recipe.User.id !== currentState.authUser.user.id) {
        // flash a message to the user and redirect to home
        replace({
          pathname: '/'
        });
      }

      return true;
    }
  }

  // this in future will be the 404 page.
  replace({
    pathname: '/'
  });
};

/**
 * Redirect to home if the user is authenticated
 *
 * @param {any} nextState Next router destination
 * @param {any} replace replace the next route
 * @returns {null} null
 */
const redirectIfAuth = (nextState, replace) => {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    replace({
      pathname: '/'
    });
  }
};


ReactDOM.render((
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}></IndexRoute>

        <Route path="/recipes"
          component={Recipes}
        ></Route>

        <Route path="/recipe/:id"
          component={SingleRecipe}
        ></Route>

        <Route path="/user/:id"
          component={UserProfile}
          onEnter={checkIfAuth}
        ></Route>

        <Route path="/user/:id/recipes"
          component={UserRecipes}
          onEnter={checkIfAuth}
        ></Route>

        <Route path="/recipes/create"
          component={CreateRecipe}
          onEnter={checkIfAuth}
        ></Route>
 
        <Route path="/my/favorites"
          component={UserFavorites}
          onEnter={checkIfAuth}
        ></Route>

        <Route path="/recipe/:id/edit"
          component={CreateRecipe}
          onEnter={checkIfAuthorized}
        ></Route>

        <Route path="/auth/login"
          component={Login}
          onEnter={redirectIfAuth}
        ></Route>

        <Route path="/auth/register"
          component={Register}
          onEnter={redirectIfAuth}
        ></Route>

      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
