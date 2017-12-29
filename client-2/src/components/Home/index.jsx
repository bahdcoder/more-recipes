import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mockRecipes from '../../mock/recipes.json';
import RecipeRow from '../RecipeRow';
import LeadButtons from './components/LeadButtons';
import recipeProptype from '../../propTypes/recipe';

/**
 * Home Screen component
 * When this component is mounted, it triggers a
 * call to the api to find latest and most favorited recipes
 * This puts those in the store.
 * @returns {class} jsx
 */
const Home = ({ mostFavoritedRecipes, latestRecipes }) => (
  (
    <div>
      <div id="jumbotron" className="jumbotron text-center">
        <h1 className="display-3 mb-5">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} className="jumbotron-logo-img mr-2" alt="" />
        </h1>
        <p className="lead jumbotron-title display-4 wow bounceInUp" style={{ color: 'white' }}>Making everyday cooking fun !</p>
        <br />
        <p className="lead">
          <LeadButtons isAuthenticated={false} />
        </p>
      </div>
      <div className="container-fluid px-5 my-5">
        <h1 className="display-5 text-center my-5 wow fadeInDown" style={{ padding: '30px 0px' }}>
          <i className="ion ion-star mr-3" />
            Lastest Recipes
        </h1>
        <br />
        <RecipeRow recipes={latestRecipes} />
      </div>
      <div className="container-fluid px-5 my-5">
        <h1 className="display-5 text-center my-5 wow fadeInDown" style={{ padding: '30px 0px' }}>
          <i className="ion ion-heart mr-4" />
          Most favorited Recipes
        </h1>
        <br />
        <RecipeRow recipes={mostFavoritedRecipes} />
      </div>
      <br /><br /><br />
    </div>
  )
);

Home.propTypes = {
  mostFavoritedRecipes: PropTypes.arrayOf(recipeProptype).isRequired,
  latestRecipes: PropTypes.arrayOf(recipeProptype).isRequired
};

const mapStateToProps = () => ({
  mostFavoritedRecipes: mockRecipes,
  latestRecipes: mockRecipes
});

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
