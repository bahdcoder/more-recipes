import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Home from './pages/Home';
import Recipes from './pages/Recipes';

import store, { history } from './store';

import '../css/styles.css';
import leenImage from '../assets/leen.jpg';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/recipes" component={Recipes}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

