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

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: null,
      email: null,
      about: '',
      user: null,
      settings: {
        reviewEmails: 1,
        favoriteModifiedEmail: 1
      }
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  async handleSettingsChange(event) {
    const settings = this.state.settings;
    const { name, checked } = event.target;

    settings[name] = checked === true ? 1 : 0;

    this.setState({
      settings
    });
  }

  async saveChanges(userIndex) {
    this.setState({
      editing: false
    });

    try {
      const response = await this.props.updateUserProfile({
        name: this.state.name,
        about: this.state.about,
        settings: this.state.settings
      }, userIndex);
    } catch (error) {
      console.log(error);
    }
  }

  startEditing() {
    const userIndex = this.props.users.findIndex(user => user.id === this.props.params.id);    
    const user = this.props.users[userIndex];
    let settings;
    try {
      settings = JSON.parse(user.settings);
    } catch (e) {
      settings = user.settings;
    }
    console.log(settings);

    this.setState({
      editing: true,
      name: user.name,
      email: user.email,
      about: user.about,
      settings
    });
  }

  async componentWillMount() {
    try {
      const response = await this.props.findUser(this.props.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let userProfile;
    let editButton = (
      <span></span>
    );
    let userName;
    let aboutText;
    let notificationSettings;
    const userIndex = this.props.users.findIndex(user => user.id === this.props.params.id);    
    const user = this.props.users[userIndex];

    if (this.state.editing) {
      notificationSettings = (
        <div className="my-5">
          <div className="input-group mb-5">
              <span className="input-group-addon mr-3">
                  <input name="reviewEmails" defaultChecked={this.state.settings.reviewEmails === 1 ? true : false } onChange={this.handleSettingsChange} type="checkbox"/>
              </span>
              Send me an email each time someone leaves a review on my recipe
          </div>
          <div className="input-group">
              <span className="input-group-addon mr-3">
                  <input name="favoriteModifiedEmail" defaultChecked={this.state.settings.favoriteModifiedEmail === 1 ? true : false } value={this.state.settings.favoriteModifiedEmail} type="checkbox" onChange={this.handleSettingsChange}/>
              </span>
              Send me an email when my favorite recipes are updated
          </div>
        </div>
      );
    }

    
    if (userIndex === -1) {
      userProfile = <UserProfileLoader />;
    } else {

      if (this.state.editing) {
        editButton = (
          <button className="btn btn-primary"
                  onClick={(event) => { this.saveChanges(userIndex); }}>
              Save changes
          </button>
        );
        userName = (
          <input className="form-control" 
                 value={this.state.name}
                 onChange={(event) => { this.setState({ name: event.target.value }); }}
                 />
        );
        aboutText = (
          <textarea className="form-control mb-3" 
                    col={3}
                    row={3}
                    value={this.state.about}
                    placeholder="Tell us about yourself ..."
                    onChange={(event) => { this.setState({ about: event.target.value }); }}
          ></textarea>
        );
      } else {
        if (this.props.authUser.user.id === user.id) {
          editButton = (
              <button className="btn btn-primary" 
                      onClick={this.startEditing}>
                <i className="ion ion-edit"  style={{ color: 'white' }}></i>
              </button>
          );
        }
        userName = (
          <h1 className="text-center header-color">{user.name}</h1>
        );
        aboutText = (
          <p className="text-center my-4">
            {user.about}
          </p>
        );
      }
      
      userProfile = (
        <div className="col-lg-8 col-md-8 text-center wow fadeIn">
          {/* Profile avatar */}
          <div className="justify-content-center mx-auto my-5">
            <Gravatar style={{width: 90, height: 90, borderRadius: '100%'}} email={user.email}/>
          </div>
          {/* End of profile avatar */}
          {/* User name */}
          {userName}
          {/* End user name */}
          {/* User stats */}
          <p className="text-center my-4">
            <span className="mr-3 h2 header-color"> {user.recipes.length} </span> <span className="h6 mr-3"><Link to={`/user/${user.id}/recipes`} style={{ textDecoration: 'none' }} className="color-darker">RECIPES</Link></span>
          </p>
          {/* End user stats */}
          {/* User bio */}
          {aboutText}
          {notificationSettings}
          <br/>
          {editButton}
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
        <br/>
        <br/>
        <Footer />
      </div>
    );
  }
}
