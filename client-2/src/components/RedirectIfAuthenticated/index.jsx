import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectIfAuthenticated = ({ component: PageComponent, isAuthenticated, ...rest }) => ((
  <Route
    {...rest}
    render={props => (
    !isAuthenticated ? (<PageComponent {...props} />) : <Redirect to={{ pathname: '/' }} />)}
  />
));

RedirectIfAuthenticated.propTypes = {
  component: PropTypes.instanceOf(Component).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({ isAuthenticated: auth.accessToken && auth.authUserId });

const ConnectedRedirectIfAuthenticated = connect(mapStateToProps, null)(RedirectIfAuthenticated);

export default ConnectedRedirectIfAuthenticated;
