import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

import App from './../App';


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
