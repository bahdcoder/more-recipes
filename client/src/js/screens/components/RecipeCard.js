import React from 'react';
import { Link } from 'react-router';

import RecipeActions from './RecipeActions';
import meal1 from './../../../assets/img/meal-1.jpg';

export default class RecipeCard extends React.Component {
  render() {
    let recipe = this.props.recipe;
    return (
      <div className="wow fadeIn card mb-3">
        <div className="img-zoom">
          <img className="card-img-top" style={{height: 170}} src={recipe.imageUrl} />                
        </div>
        <div className="card-body">
          <h5 className="card-title h6 text-center">
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </h5>
          <hr />
          <p className="text-sm mb-5">
            <small><span className="text-muted">by</span> <Link to={`/user/${recipe.User.id}`} style={ { textDecoration: 'none' } } className="header-color">{recipe.User.name}</Link></small>
            <span className="text-muted float-right">
              <i className="ion ion-clock mr-2" />
              {recipe.timeToCook} min</span>
          </p>
        </div>
      </div>
    );
  }
}
