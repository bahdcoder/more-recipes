import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import { history } from './store';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SignUp from './components/Auth/SignUp';
import UserProfile from './components/UserProfile';

/**
 * App component
 * @returns {class} class
 */
const App = () => (
  <ConnectedRouter history={history}>
    <div>
      <Navbar />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={SignUp} path="/auth/register" />
        <Route component={UserProfile} path="/profile" />
      </Switch>
      <Footer />
    </div>
  </ConnectedRouter>
);

export default App;
