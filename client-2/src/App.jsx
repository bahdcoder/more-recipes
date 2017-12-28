import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar/>
            <Switch>
              <Route component={Home} exact path='/'/>
              <Route component={UserProfile} path='/profile'/>       
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
