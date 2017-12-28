import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-custom">
    <Link className="navbar-brand" to="/">
      <img src={`${process.env.PUBLIC_URL}/img/logo.png`} className="navbar-logo-img mr-2" alt=''/>
      More-recipes
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="" className="nav-link create-recipe-link">Create recipe <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item mr-3">
          <a className="nav-link" href="">Recipes <span className="sr-only">(current)</span></a>
        </li>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text" />
        </form>
      </ul>
    </div>
  </nav>
);

export default Navbar;
