import React from 'react';
import LeadButtons from './components/LeadButtons';

class Home extends React.Component {
  render() {
    return (
      <div id="jumbotron" className="jumbotron text-center">
        <h1 className="display-3 mb-5">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} className="jumbotron-logo-img mr-2" />
        </h1>
        <p className="lead jumbotron-title display-4 wow bounceInUp" style={{color: 'white'}}>Making everyday cooking fun !</p>
        <br />
        <p className="lead">
          {/* The home button 
                  If the user is authenticated, let him rather see a create recipe button
              */}
          <LeadButtons />
          {/* End of the home button */}
        </p>
      </div>
    );
  }
}

export default Home;
