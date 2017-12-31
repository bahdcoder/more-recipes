import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecipeRow from '../RecipeRow';
import LeadButtons from './components/LeadButtons';
import recipeProptype from '../../propTypes/recipe';
import { fetchHomePageData } from '../../store/actions/recipes';

/**
 * Home Screen component
 * When this component is mounted, it triggers a
 * call to the api to find latest and most favorited recipes
 * This puts those in the store.
 * @returns {class} jsx
 */
class Home extends React.Component {
  static propTypes = {
    mostFavoritedRecipes: PropTypes.arrayOf(recipeProptype).isRequired,
    latestRecipes: PropTypes.arrayOf(recipeProptype).isRequired,
    fetchHomePageData: PropTypes.func.isRequired
  }
  /**
   * Fetch home page data when the component mounts
   * @returns {null} null
   */
  componentWillMount() {
    this.props.fetchHomePageData();
  }
  /**
   * Render the component
   * @returns {jsx} component jsx
   */
  render() {
    return (
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
          <RecipeRow recipes={this.props.latestRecipes} />
        </div>
        <div className="container-fluid px-5 my-5">
          <h1 className="display-5 text-center my-5 wow fadeInDown" style={{ padding: '30px 0px' }}>
            <i className="ion ion-heart mr-4" />
            Most favorited Recipes
          </h1>
          <br />
          <RecipeRow recipes={this.props.mostFavoritedRecipes} />
        </div>
        <br /><br /><br />
      </div>
    );
  }
}

const mostFavoritedRecipes = recipesFromStore =>
  recipesFromStore.sort((recipeA, recipeB) =>
    recipeA.favoritersIds.length > recipeB.favoritersIds.length).slice(0, 3);

const latestRecipes = recipesFromStore =>
  recipesFromStore.sort((recipeA, recipeB) =>
    recipeA.createdAt > recipeB.createdAt).slice(0, 3);

const mapStateToProps = ({ recipes }) => ({
  mostFavoritedRecipes: mostFavoritedRecipes(recipes),
  latestRecipes: latestRecipes(recipes)
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchHomePageData
}, dispatch));

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
