import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-custom">
        <NavLink className="navbar-brand" to="/">
          <img src="../../../assets/img/logo.png" className="navbar-logo-img mr-2" alt />
          More-recipes
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/recipes/create" className="nav-link create-recipe-link">Create recipe <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item mr-3">
              <NavLink to="/recipes" className="nav-link">Recipes <span className="sr-only">(current)</span></NavLink>
            </li>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            </form>
          </ul>
        </div>
      </nav>
    );
  }
}