import lockr from 'lockr';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import store from './../store';
import * as actionCreators from '../store/actions/actionCreators';

import './../../css/styles.css';

import Notification from '../screens/components/Notification';

/**
 * The Main root component
 */
class App extends Component {
  /**
   * When component is about to be mounted, get stuff from localStorage
   *
   * @memberof App
   * @returns {null} null
   */
  componentWillMount() {
    const user = lockr.get('authUser');
    if (user) {
      store.dispatch({
        type: 'SIGN_IN_USER',
        authUser: user
      });
    }
  }

  /**
   * Render all child components
   * @returns {obj} jsx
   */
  render() {
    return (
      <div>
        <Notification />
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
const mapStateToProps = state => state;
/**
 * Map store dispatch method to App component props
 *
 * @param {any} dispatch redux dispatch method
 * @returns {obj} object of all action creators
 */
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
