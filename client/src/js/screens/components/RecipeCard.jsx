import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const RecipeCard = ({ recipe }) => ((
  <div className="wow fadeIn card mb-3">
    <div className="img-zoom">
      <img className="card-img-top" alt="" style={{ height: 170 }} src={recipe.imageUrl} />
    </div>
    <div className="card-body">
      <h5 className="card-title h6 text-center">
        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
      </h5>
      <hr />
      <p className="text-sm mb-3">
        <small><span className="text-muted">by</span> <Link to={`/user/${recipe.User.id}`} style={{ textDecoration: 'none' }} className="header-color">{recipe.User.name}</Link></small>
        <span className="text-muted float-right">
          <i className="ion ion-clock mr-2" />
          {recipe.timeToCook} min
        </span>
      </p>
      <p className="text-muted h4 text-center my-2">
        <span className="mr-3 h5">
          <i className="ion ion-recipe-action-disabled ion-happy-outline" />
          <span className="ml-3">{numeral(recipe.upvotersIds.length).format('0a')}</span>
        </span>
        <span className="mr-3 h5">
          <i className="ion ion-recipe-action-disabled ion-sad-outline" />
          <span className="ml-3">{numeral(recipe.downvotersIds.length).format('0a')}</span>
        </span>
        <span className="mr-3 h5">
          <i className="ion ion-recipe-action-disabled ion-ios-heart-outline" />
          <span className="ml-3">{numeral(recipe.favoritersIds.length).format('0a')} </span>
        </span>
      </p>
    </div>
  </div>
));

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

export default RecipeCard;
