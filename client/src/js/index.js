import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { isAuthenticated } from './helpers';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';

import store from './store';

import Home from './screens/pages/Home';
import Recipes from './screens/pages/Recipes';
import CreateRecipe from './screens/pages/CreateRecipe/createRecipe';

import '../css/bootstrap.min.css';
import '../css/animate.min.css';
import '../css/styles.css';

import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';

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
    pathname: '/'
  });
}


ReactDOM.render((
  <Provider store={ store }>
    <Router history={ syncHistoryWithStore(browserHistory, store) }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ Home }></IndexRoute>
        <Route path="/recipes" 
               component={ Recipes }
        ></Route>
        <Route path="/recipes/create" 
               component={ CreateRecipe }
               onEnter={ checkIfAuth }
        ></Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
registerServiceWorker();
