/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';

import logo from './../../../assets/img/logo.png';

/**
 * The navbar component
 * @param {object} props
 * @returns {jsx} jsx
 */
const Navbar = (props) => {
  const { authUser } = props;
  let navbarUser;
  if (authUser) {
    navbarUser = (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <Gravatar className="mr-2 navbar-avatar-img" email={props.authUser.user.email} />
          Hey, {props.authUser.user.name}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={`/user/${props.authUser.user.id}`}>My profile</Link>
          <Link id="myRecipes" className="dropdown-item" to={`/user/${props.authUser.user.id}/recipes`}>My recipes</Link>
          <Link className="dropdown-item" to="/my/favorites">My favorites</Link>
          <a
            className="dropdown-item logout"
            id="logout"
            onClick={async () => {
              await props.signOut();
              props.router.push('/');
            }}
          >
            Sign out
          </a>
        </div>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <Link className="navbar-brand" to="/">
        <img src={logo} className="navbar-logo-img mr-2" alt="" />
        More-recipes
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
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
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={(event) => {
              event.preventDefault();
              if (props.location.pathname === '/recipes') {
                props.triggerGetRecipesCatalog();
              } else {
                props.router.push(`/recipes?query=${props.location.query.query || ''}`);
              }
            }}
          >
            <input
              className="form-control mr-sm-2"
              value={props.location.query.query || ''}
              onChange={(event) => {
                props.changeRouterQueryParams('query', event.target.value, props.location);
              }}
              type="text"
              placeholder="Search recipes"
              aria-label="Search"
            />
          </form>
          {navbarUser}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  signOut: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerGetRecipesCatalog: PropTypes.func.isRequired,
  changeRouterQueryParams: PropTypes.func.isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired
};

Navbar.defaultProps = {
  authUser: null
};

export default Navbar;
