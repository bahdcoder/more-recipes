import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home';
import UserProfile from './components/UserProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            {/*have a navbar component here.*/}
            <ul>
              <li>
                <Link to='/'>Home page</Link>
              </li>
              <li>
                <Link to='/profile'>Profile page</Link>
              </li>
            </ul>

            <Switch>
              <Route component={Home} exact path='/'/>
              <Route component={UserProfile} path='/profile'/>       
            </Switch>   

            {/*have a footer component here.*/}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
