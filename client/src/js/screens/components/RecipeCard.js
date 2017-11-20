import React from 'react';
import { Link } from 'react-router';

import RecipeActions from './RecipeActions';
import meal1 from './../../../assets/img/meal-1.jpg';

export default class RecipeCard extends React.Component {
  render() {
    return (
      <div className="card mb-3">
        <div className="img-zoom">
          <img className="card-img-top" style={{height: 170}} src={meal1} />                
        </div>
        <div className="card-body">
          <h5 className="card-title h6 text-center">
            <Link to={`/recipe/${this.props.recipe.id}`}>{this.props.recipe.title}</Link>
          </h5>
          <hr />
          <p className="text-sm mb-5">
            <small><span className="text-muted">by</span> Elizabeth  Funkirokeze</small>
            <span className="text-muted float-right">
              <i className="ion ion-clock mr-2" />
              35 min</span>
          </p>
        </div>
      </div>
    );
  }
}
