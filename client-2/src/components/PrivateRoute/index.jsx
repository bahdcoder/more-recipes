import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: PageComponent, isAuthenticated, ...rest }) => ((
  <Route
    {...rest}
    render={props => (
    isAuthenticated ? (<PageComponent {...props} />) : <Redirect to={{ pathname: '/auth/login' }} />)}
  />
));

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Component).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({ isAuthenticated: auth.accessToken && auth.authUserId });

const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export default ConnectedPrivateRoute;
