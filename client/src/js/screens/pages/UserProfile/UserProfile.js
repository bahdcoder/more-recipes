import Gravatar from 'react-gravatar';
import React, { Component } from 'react';

import { Link } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import UserProfileLoader from './components/UserProfileLoader';
/**
 * Display the user profile
 *
 * @export
 * @class UserProfile
 * @extends {Component}
 */
export default class UserProfile extends Component {
  async componentWillMount() {
    try {
      //  const response = await this.props.getUser
      const userIndex = this.props.users.findIndex(user => user.id === this.props.params.id);
      if (userIndex === -1) {
        const response = await this.props.findUser(this.props.params.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let userProfile;
    const userIndex = this.props.users.findIndex(user => user.id === this.props.params.id);
    if (userIndex === -1) {
      userProfile = <UserProfileLoader />;
    } else {
      const user = this.props.users[userIndex];
      userProfile = (
        <div className="col-lg-8 col-md-8 text-center wow fadeIn">
          {/* Profile avatar */}
          <div className="justify-content-center mx-auto my-5">
            <Gravatar style={{width: 90, height: 90, borderRadius: '100%'}} email={user.email}/>
          </div>
          {/* End of profile avatar */}
          {/* User name */}
          <h1 className="text-center header-color">{user.name}</h1>
          {/* End user name */}
          {/* User stats */}
          <p className="text-center my-4">
            <span className="mr-3 h2 header-color"> 531,233 </span> <span className="h6 mr-3"><a href="/user-recipes.html" className="color-darker">RECIPES</a></span>
            <span className="mr-3 h2 header-color"> 531 </span> <span className="h6">REVIEWS</span>
          </p>
          {/* End user stats */}
          {/* User bio */}
          <p className="text-center my-4">
            I am an Andela developer, with a great passion for cooking. 
            I'm in charge of organizing birthday parties for my fellow andelans. 
            What's the meal you wanna cook for your next event ? 
            Hit me up for a recipe. 
          </p>
          {/* End user bio */}
        </div>
      );
    }
    return (
      <div>
        <Navbar {...this.props}/>
        <div className="container my-5">
          <div className="row justify-content-center">
            {userProfile}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
