import { render } from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Recipes from './pages/Recipes';

import '../css/styles.css';
import leenImage from '../assets/leen.jpg';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/recipes" component={Recipes}/>
        </div>
      </BrowserRouter>
    );
  }
}

