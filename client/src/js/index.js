import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { isAuthenticated } from './helpers';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';

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

import Main from './containers/Main';



/**
 * Set default axios configurations
 */
function setAxios() {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    axios.defaults.headers.common['x-access-token'] = JSON.parse(authUser).access_token;  
  }
}

setAxios();

/**
 * Check if the user is authenticated
 * 
 * @param {any} nextState Next router destination
 * @param {any} replace replace the next route 
 * @returns 
 */
function checkIfAuth (nextState, replace) {
  if (isAuthenticated(store.getState())) {
    return true;
  }
  
  replace({
    pathname: '/auth/login'
  });
}


/**
 * Redirect to home if the user is authenticated
 * 
 * @param {any} nextState Next router destination
 * @param {any} replace replace the next route 
 * @returns 
 */
function redirectIfAuth(nextState, replace) {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    replace({
      pathname: '/'
    });
  }
  
}


ReactDOM.render((
  <Provider store={ store }>
    <Router history={ syncHistoryWithStore(browserHistory, store) }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ Home }></IndexRoute>

        <Route path="/recipes" 
               component={ Recipes }
        ></Route>

        <Route path="/recipe/:id" 
               component={ SingleRecipe }
        ></Route>

        <Route path="/user/:id"
               component={ UserProfile }
               onEnter={ checkIfAuth }
        ></Route>

        <Route path="/user/:id/recipes"
               component={ UserRecipes }
               onEnter={ checkIfAuth }
        ></Route>
        
        <Route path="/recipes/create" 
               component={ CreateRecipe }
               onEnter={ checkIfAuth }
        ></Route>

        <Route path="/my/favorites" 
               component={ UserFavorites }
               onEnter={ checkIfAuth }
        ></Route>

        <Route path="/auth/login"
               component={ Login }
               onEnter={ redirectIfAuth }
        ></Route>

        <Route path="/auth/register"
               component={ Register }
               onEnter={ redirectIfAuth }
        ></Route>

      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
