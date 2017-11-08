import { render } from 'react-dom';
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';


import Home from './screens/pages/Home';
import Recipes from './screens/pages/Recipes';

import store, { history } from './store';

import '../css/styles.css';

export default class App extends Component {
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
