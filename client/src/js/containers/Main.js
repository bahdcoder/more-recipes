import lockr from 'lockr';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'react-router-redux';

import * as actionCreators from '../store/actions/actionCreators';

import Home from './../screens/pages/Home';
import Recipes from './../screens/pages/Recipes';

import store, { history } from './../store';

import './../../css/styles.css';


class App extends Component {
  /**
   * When component is about to be mounted, get stuff from localStorage
   * 
   * @memberof App
   */
  componentWillMount() {
    try {
      const user = lockr.get('authUser');
      console.log(user);

      store.dispatch({
        type: 'SIGN_IN_USER',
        authUser: user
      });
    } catch (error) {
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



/**
 * Map the application state as props to the App component
 *
 * @param {any} state redux state (store)
 * @returns {object} the props format
 */
function mapStateToProps(state) {
  return { ...state };
}
/**
 * Map store dispatch method to App component props
 *
 * @param {any} dispatch redux dispatch method
 * @returns {obj} object of all action creators
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
