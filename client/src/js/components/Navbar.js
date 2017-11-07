import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-custom">
        <a className="navbar-brand" href="index.html">
          <img src="../../../assets/img/logo.png" className="navbar-logo-img mr-2" alt />
          More-recipes
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="create-recipe.html" className="nav-link create-recipe-link">Create recipe <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="recipes.html">Recipes <span className="sr-only">(current)</span></a>
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