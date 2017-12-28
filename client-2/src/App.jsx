import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';

/**
 * App component
 * @returns {class} class
 */
const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={UserProfile} path="/profile" />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
