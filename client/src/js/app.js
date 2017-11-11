import { render } from 'react-dom';
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';


import Home from './screens/pages/Home';
import Recipes from './screens/pages/Recipes';

import store, { history } from './store';

import '../css/styles.css';

export default class App extends Component {
  /**
   * When component is mounted, get stuff from localStorage
   * 
   * @memberof App
   */
  componentDidMount() {
    console.log('THIS MOUNTED');
    try {
      const user = JSON.parse(localStorage.getItem('authUser'));
      console.log(user);
      store.dispatch({
        type: 'SIGN_IN_USER',
        authUser: user
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
