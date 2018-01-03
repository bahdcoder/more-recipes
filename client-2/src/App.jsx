import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import { history } from './store';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { checkAuth } from './services/checkAuth';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

/**
 * App component
 * @returns {class} class
 */
class App extends React.Component {
  /**
   * Get user from localStorage when component mounts
   * @returns {null} null
   */
  componentWillMount() {
    checkAuth();
  }

  /**
   * Render component
   * @returns {jsx} App connected router
   */
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Navbar />
          <Switch>
            <PrivateRoute component={Home} exact path="/" />
            <RedirectIfAuthenticated component={Login} path="/auth/login" />
            <RedirectIfAuthenticated component={SignUp} path="/auth/register" />
            <Route component={UserProfile} path="/profile" />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
