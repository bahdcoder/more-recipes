import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import recipePropTypes from '../../propTypes/recipe';

const RecipeCard = ({ recipe }) => (
  <div className="wow fadeIn card mb-3">
    <div className="img-zoom">
      <img
        className="card-img-top"
        style={{ height: 170 }}
        alt=""
        src={recipe.imageUrl}
      />
    </div>
    <div className="card-body">
      <h5 className="card-title h6 text-center">
        <Link to="/recipe/e304eba1-9f87-4424-8c8c-af603976fd23">{recipe.title}</Link>
      </h5>
      <hr />
      <p className="text-sm mb-3">
        <small>
          <span className="text-muted">by </span>
          <Link to="/user/7b3da821-8a11-4238-919e-871c99b1e98f" style={{ textDecoration: 'none' }} className="header-color">{recipe.User.name}</Link>
        </small>
        <span className="text-muted float-right">
          <i className="ion ion-clock mr-2" />
          {recipe.timeToCook} min
        </span>
      </p>
      <p className="text-muted h4 text-center my-2">
        <span className="mr-3 h5">
          <i className="ion ion-recipe-action ion-happy-outline" />
          <span className="ml-3">4k</span>
        </span>
        <span className="mr-3 h5">
          <i className="ion ion-recipe-action ion-sad-outline" />
          <span className="ml-3">2k</span>
        </span>
        <span className="mr-3 h5">
          <i className="ion ion-recipe-action ion-ios-heart-outline" />
          <span className="ml-3">32</span>
        </span>
      </p>
    </div>
  </div>
);

RecipeCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  recipe: recipePropTypes
};

export default RecipeCard;
