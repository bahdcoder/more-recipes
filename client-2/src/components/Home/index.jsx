import React from 'react';
import RecipeRow from '../RecipeRow';
import mockRecipes from '../../mock/recipes.json';
import LeadButtons from './components/LeadButtons';

/**
 * Home Screen component
 * @returns {class} jsx
 */
const Home = () => (
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
        <RecipeRow recipes={mockRecipes} />
      </div>
    </div>
  )
);

export default Home;
