import React from 'react';
import Provider from 'react-redux';
import { Route, IndexRoute, syncHistoryWithStore } from 'react-router';

import Main from './containers/Main';

import Home from './screens/pages/Home';
import Login from './screens/pages/Login';
import Recipes from './screens/pages/Recipes';
import Register from './screens/pages/Register';
import UserProfile from './screens/pages/UserProfile/UserProfile';
import UserRecipes from './screens/pages/UserRecipes/UserRecipes';
import SingleRecipe from './screens/pages/SingleRecipe/SingleRecipe';
import CreateRecipe from './screens/pages/CreateRecipe/createRecipe';
import UserFavorites from './screens/pages/UserFavorites/UserFavorites';

const renderRouter = () => ((
  <Provider store={ store }>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />

        <Route path="/recipes" 
               component={ Recipes }
        />

        <Route path="/recipe/:id" 
               component={ SingleRecipe }
        />

        <Route path="/user/:id"
               component={ UserProfile }
               onEnter={ checkIfAuth }
        />

        <Route path="/user/:id/recipes"
               component={ UserRecipes }
               onEnter={ checkIfAuth }
        />
        
        <Route path="/recipes/create" 
               component={ CreateRecipe }
               onEnter={ checkIfAuth }
        />

        <Route path="/my/favorites" 
               component={ UserFavorites }
               onEnter={ checkIfAuth }
        />

        <Route path="/recipe/:id/edit" 
               component={ CreateRecipe }
               onEnter={ checkIfAuthorized }
        />

        <Route path="/auth/login"
               component={ Login }
               onEnter={ redirectIfAuth }
        />

        <Route path="/auth/register"
               component={ Register }
               onEnter={ redirectIfAuth }
        />
      </Route>
    </Router>
  </Provider>
));

export default renderRouter;