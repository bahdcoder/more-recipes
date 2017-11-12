import React from 'react';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';

export default class NavBar extends React.Component {
  render() {
    let authUser = this.props.authUser;
    let navbarUser = '';
    if (authUser) {
      navbarUser = (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="javascript:;" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <Gravatar className="mr-2 navbar-avatar-img" email={this.props.authUser.user.email}/>
                  Hey, {this.props.authUser.user.name}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="profile.html">My profile</a>
              <a className="dropdown-item" href="favorites.html">My favorites</a>
              <a className="dropdown-item" href="settings.html">Notification settings</a>
              <a className="dropdown-item" 
                 href="javascript:;" 
                 onClick={async () => {
                   await this.props.signOut();
                   this.props.router.push('/');
                 }}>Sign out</a>
          </div>
      </li>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-custom">
        <Link className="navbar-brand" to="/">
          <img src="../../../assets/img/logo.png" className="navbar-logo-img mr-2" />
          More-recipes
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/recipes/create" className="nav-link create-recipe-link">Create recipe <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item mr-3">
              <Link to="/recipes" className="nav-link">Recipes <span className="sr-only">(current)</span></Link>
            </li>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            </form>
            {navbarUser}
          </ul>
        </div>
      </nav>
    );
  }
}