import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import logo from './../../../../assets/img/logo.png';
import RecipeCard from '../../components/RecipeCard';
import HomeButtons from './components/HomeButtons';
import RecipeCardLoader from '../../components/RecipeCardLoader';

/**
 * The home page component
 */
class Home extends React.Component {
  static propTypes = {
    getHomePageData: PropTypes.func
  };

  static defaultProps = {
    getHomePageData: () => {}
  };
  /**
   * The home page props
   * @param {obj} props props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }
  /**
   * Trigger when component mounts
   * @returns {null} null
   */
  async componentWillMount() {
    await this.props.getHomePageData();
    this.setState({
      loading: false
    });
  }

  /**
   * Render jsx for this component
   * @returns {obj} jsx
   */
  render() {
    let latestRecipes = [];

    if (this.state.loading) {
      latestRecipes = (
        <div className="row">
          <div className="col-md-4">
            <RecipeCardLoader />
          </div>
          <div className="col-md-4">
            <RecipeCardLoader />
          </div>
          <div className="col-md-4">
            <RecipeCardLoader />
          </div>
        </div>
      );
    } else {
      let numberOnPage = 3;
      const sortedLatestRecipes = this.props.recipes.sort((recipe1, recipe2) =>
        recipe1.createdAt < recipe2.createdAt);
      if (sortedLatestRecipes.length > 5) {
        numberOnPage = 6;
      }
      const trimmedListOfLatestRecipes = sortedLatestRecipes.slice(0, numberOnPage);
      latestRecipes = trimmedListOfLatestRecipes.map(recipe => ((
        <div className="col-md-4" key={recipe.id}>
          <RecipeCard recipe={recipe} {...this.props} />
        </div>
      )));
    }

    let mostFavoritedRecipes = [];
    if (this.state.loading) {
      mostFavoritedRecipes = (
        <div className="row">
          <div className="col-md-4">
            <RecipeCardLoader />
          </div>
          <div className="col-md-4">
            <RecipeCardLoader />
          </div>
          <div className="col-md-4">
            <RecipeCardLoader />
          </div>
        </div>
      );
    } else {
      let numberOnPage = 3;
      const sortedMostFavoritedRecipes = this.props.recipes.sort((recipe1, recipe2) =>
        recipe1.favoritersIds.length < recipe2.favoritersIds.length);
      if (sortedMostFavoritedRecipes.length > 5) {
        numberOnPage = 6;
      }
      const trimmedListOfMostFavoritedRecipes = sortedMostFavoritedRecipes.slice(0, numberOnPage);
      mostFavoritedRecipes = trimmedListOfMostFavoritedRecipes.map(recipe => ((
        <div className="col-md-4" key={recipe.id}>
          <RecipeCard recipe={recipe} {...this.props} />
        </div>
      )));
    }

    return (
      <div>
        {/* The navigation bar begin */}
        <Navbar {...this.props} />
        {/* The navigation bar ending */}
        {/* The Jumbotron Area */}
        <div id="jumbotron" className="jumbotron text-center">
          <h1 className="display-3 mb-5">
            <img src={logo} className="jumbotron-logo-img mr-2" alt="" />
          </h1>
          <p className="lead jumbotron-title display-4 wow bounceInUp" style={{ color: 'white' }}>Making everyday cooking fun !</p>
          <br />
          <p className="lead">
            <HomeButtons
              authUser={this.props.authUser}
              isAuthenticated={this.props.authUser !== undefined && this.props.authUser !== null}
            />
            {/* End of the home button */}
          </p>
        </div>
        {/* End of the jumbotron area */}
        {/* Top rated recipes section */}
        <div className="container-fluid px-5 my-5">
          <h1 className="display-5 text-center my-5 wow fadeInDown" style={{ padding: '30px 0px' }}>
            <i className="ion ion-star mr-3" />
            Lastest Recipes
          </h1>
          <br />
          <div className="card-deck wow fadeIn">
            {latestRecipes}
          </div>
        </div>
        {/* End of top rated recipes section */}
        {/* Most favorited recipes section */}
        <div className="container-fluid px-5 my-5">
          <h1 className="display-5 text-center my-5 wow fadeInDown" style={{ padding: '30px 0px' }}>
            <i className="ion ion-heart mr-4" />
            Most favorited Recipes
          </h1>
          <br />
          <div className="card-deck wow fadeIn">
            {mostFavoritedRecipes}
          </div>
        </div>
        <br /><br /><br />
        {/* End of top rated recipes section */}

        {/* Begin page footer */}
        <Footer />
        {/* End page footer */}
      </div>
    );
  }
}

export default Home;
