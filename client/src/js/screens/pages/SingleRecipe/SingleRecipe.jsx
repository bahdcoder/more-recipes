import axios from 'axios';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from './../../../config';
import Reviews from './components/Reviews';
import NavBar from './../../components/Navbar';
import Footer from './../../components/Footer';
import UsersModal from './components/UsersModal';
import recipePropType from '../../../propTypes/recipe';
import SingleRecipeLoader from './../../components/SingleRecipeLoader';

/**
 * Display a single recipe
 */
class SingleRecipe extends Component {
  static propTypes = {
    recipe: recipePropType,
    authUser: PropTypes.objectOf(PropTypes.any),
    getSingleRecipe: PropTypes.func.isRequired,
    toggleDownvote: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    toggleUpvote: PropTypes.func.isRequired,
    indexOfRecipe: PropTypes.number.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired
  };

  static defaultProps = {
    recipe: null,
    authUser: null
  };
  /**
   * Initialize component
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      canActOnRecipe: true,
      topChefs: null,
      similarRecipes: null,
      usersModal: {
        title: 'Recipe upvoters',
        users: null,
        loading: true
      }
    };
    this.getBulkUsers = this.getBulkUsers.bind(this);
    this.toggleUpvote = this.toggleUpvote.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
    this.checkIfCanActOnRecipe = this.checkIfCanActOnRecipe.bind(this);
  }

  /**
   * Fetch the recipe once the component is mounted.
   *
   * @memberof SingleRecipe
   * @returns {null} null
   */
  async componentWillMount() {
    if (!this.props.recipe) {
      await this.props.getSingleRecipe(this.props.params.id);
      this.checkIfCanActOnRecipe(this.props.recipe);
    } else {
      this.checkIfCanActOnRecipe(this.props.recipe);
    }
    //  Refactor this to an actionCreator
    try {
      const response = await axios.get(`${config.apiUrl}/recipes?sort=mostFavorited&perPage=4`);
      const { recipes } = response.data.data.recipes;
      if (this.props.authUser) {
        setTimeout(async () => {
          await axios.post(`${config.apiUrl}/recipes/${this.props.params.id}/views`);
        }, 10000);
      }
      const topChefs = recipes.map(recipe => recipe.User);
      const uniqueChefs = [];
      topChefs.forEach((chef) => {
        if (uniqueChefs.findIndex(c => c.id === chef.id) === -1) {
          uniqueChefs.push(chef);
        }
      });
      this.setState({
        topChefs: uniqueChefs
      });
    } catch (errors) {
      // notify the user something happened.
    }
  }

  /**
   * Execute after component is mounted.
   * @returns {null} null
   */
  async componentDidMount() {
    window.scroll(0, 0);
  }

  /**
   * Get bulk favoriters, voters, upvoters, downvoters
   * @param {string} action
   * @returns {null} null
   */
  getBulkUsers(action) {
    const newState = {
      title: `Recipe ${action}`,
      users: null,
      loading: true
    };

    this.setState({ usersModal: newState });
  }

  /**
   *
   * @param {*} indexOfRecipe
   * @param {*} hasFavorited
   * @param {*} indexOfFavoriter
   * @returns {null} null
   */
  async toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter) {
    if (!this.state.canActOnRecipe) {
      return;
    }
    try {
      await this.props
        .toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter, this.props.params.id);
    } catch (error) {
      // tell the user something went wrong.
    }
  }

  /**
   * Check if user can act on recipe
   *
   * @param {object} recipe
   * @returns {null} null
   */
  checkIfCanActOnRecipe(recipe) {
    if (this.props.checkAuth()) {
      if (this.props.authUser.user.id === recipe.User.id) {
        this.setState({
          canActOnRecipe: false
        });
      }
    } else {
      this.setState({
        canActOnRecipe: false
      });
    }
  }
  /**
   * Toggle upvote for a recipe
   *
   * @param {number} indexOfRecipe
   * @param {boolean} hasUpvoted
   * @param {boolean} hasDownvoted
   * @param {number} indexOfUpvoter
   * @param {number} indexOfDownvoter
   * @returns {null} null
   */
  async toggleUpvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter) {
    if (!this.state.canActOnRecipe) {
      return;
    }
    try {
      await this.props
        .toggleUpvote(
          indexOfRecipe,
          hasUpvoted,
          hasDownvoted,
          indexOfUpvoter,
          indexOfDownvoter,
          this.props.params.id
        );
    } catch (error) {
      //  NOTIFY THE USER ABOUT THE ERROR.
    }
  }
  /**
   * Downvote a recipe
   * @param {number} indexOfRecipe
   * @param {boolean} hasUpvoted
   * @param {boolean} hasDownvoted
   * @param {number} indexOfUpvoter
   * @param {number} indexOfDownvoter
   * @returns {null} null
   */
  async toggleDownvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter) {
    if (!this.state.canActOnRecipe) {
      return;
    }
    try {
      await this.props
        .toggleDownvote(
          indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter,
          indexOfDownvoter, this.props.params.id
        );
    } catch (error) {
      // NOTIFY USER OF ERROR
    }
  }

  /**
   * Render component jsx
   * @returns {objext} react jsx
   */
  render() {
    let recipeCard;
    const { recipe } = this.props;
    const { indexOfRecipe } = this.props;


    if (!recipe) {
      recipeCard = (
        <SingleRecipeLoader />
      );
    }
    let ingredients;

    if (recipe) {
      ingredients = JSON.parse(recipe.ingredients).map(ingredient =>
        (<li key={ingredient} className="list-group-item">{ingredient}</li>));
    }

    let procedure;

    if (recipe) {
      procedure = JSON.parse(recipe.procedure).map((step, index) =>
        <li key={step} className="list-group-item"><span className="badge badge-primary">{index + 1}</span>   {step}</li>);
    }

    if (recipe) {
      let hasFavorited = false;
      let hasUpvoted = false;
      let hasDownvoted = false;

      let indexOfFavoriter;
      let indexOfUpvoter;
      let indexOfDownvoter;


      if (this.props.checkAuth()) {
        indexOfFavoriter = recipe.favoritersIds
          .findIndex(userId => userId === this.props.authUser.user.id);
        if (indexOfFavoriter !== -1) {
          hasFavorited = true;
        }
        indexOfUpvoter = recipe.upvotersIds
          .findIndex(userId => userId === this.props.authUser.user.id);
        if (indexOfUpvoter !== -1) {
          hasUpvoted = true;
        }

        indexOfDownvoter = recipe.downvotersIds
          .findIndex(userId => userId === this.props.authUser.user.id);
        if (indexOfDownvoter !== -1) {
          hasDownvoted = true;
        }
      }

      recipeCard = (
        <div className="wow fadeIn card">
          <img className="card-img-top" style={{ height: 450 }} src={recipe.imageUrl} alt={recipe.title} />
          <div className="card-body">
            <h1 className="card-title text-center h4 mb-4">{recipe.title}
              <small className="text-muted" style={{ fontSize: 15 }}>
                <i className="ion ion-clock ml-4 mr-1" />
                {recipe.timeToCook}
              </small>
            </h1>
            <p className="text-center my-4">
              {recipe.description}
            </p>
            <hr />
            <div className="media text-center mx-auto my-5" style={{ width: 200 }}>
              <Gravatar
                className="d-flex mr-3"
                email={recipe.User.email}
                style={{ width: 60, height: 60, borderRadius: '100%' }}
              />
              <div className="media-body">
                <p className="h6 mt-3">
                  <Link
                    style={{ textDecoration: 'none', color: '#000' }}
                    to={`/user/${recipe.User.id}`}
                  >
                    {recipe.User.name}
                  </Link>
                </p>
              </div>
            </div>
            <p className="text-muted h4 text-center my-4">
              <span className="mr-3 h1">
                <i
                  className={hasUpvoted ? 'ion ion-happy ion-recipe-action' : 'ion ion-recipe-action ion-happy-outline'}
                  onClick={() => {
                    this
                      .toggleUpvote(
                      indexOfRecipe,
                      hasUpvoted,
                      hasDownvoted,
                      indexOfUpvoter,
                      indexOfDownvoter
                      );
                  }}
                />

                <span className="ml-3" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModal" onClick={() => this.getBulkUsers('upvoters')}>{numeral(recipe.upvotersIds.length).format('0a')}</span>
              </span>
              <span className="mr-3 h1">
                <i
                  className={hasDownvoted ? 'ion ion-sad ion-recipe-action' : 'ion ion-recipe-action ion-sad-outline'}
                  onClick={() => {
                    this.toggleDownvote(
                      indexOfRecipe,
                      hasUpvoted, hasDownvoted,
                      indexOfUpvoter,
                      indexOfDownvoter
                    );
                  }}
                />

                <span className="ml-3" style={{ cursor: 'pointer' }} onClick={() => this.getBulkUsers('downvoters')} data-toggle="modal" data-target="#exampleModal">{numeral(recipe.downvotersIds.length).format('0a')}</span>
              </span>
              <span className="mr-3 h1">
                <i
                  className={hasFavorited ? 'ion ion-ios-heart ion-recipe-action' : 'ion ion-recipe-action ion-ios-heart-outline'}
                  onClick={() => {
                    this.toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter);
                  }}
                />
                <span className="ml-3" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModal" onClick={() => this.getBulkUsers('favoriters')}>{numeral(recipe.favoritersIds.length).format('0a')} </span>
              </span>
              <span className="mr-3 h1">
                <i className="ion ion-eye" />
                <span className="ml-3" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModal" onClick={() => this.getBulkUsers('viewers')}>{numeral(recipe.viewers.length).format('0a')} </span>
              </span>
            </p>
            <hr />
            {/* Begin ingredients section */}
            <h3 className="mb-4 text-muted">Ingredients</h3>
            <ul className="list-group mt-3">
              {ingredients}
            </ul>
            <br />
            {/* End ingredients section */}
            {/* Begin procedures section */}
            <h3 className="mb-4 mt-3 text-muted">Procedure</h3>
            <ul className="list-group my-3">
              {procedure}
            </ul>
            <br />
            <h3 className="my-3 text-muted">Reviews</h3>
            {/* End procedures section */}
            {/* Reviews section */}
            <Reviews {...this.props} />
            {/* End create review section */}
          </div>
        </div>
      );
    }

    let similarRecipes;
    if (this.state.similarRecipes !== null && this.state.similarRecipes.length > 0) {
      similarRecipes = this.state.similarRecipes.map(similarRecipe => ((
        <div>
          <h3 className="text-center my-3">Similar recipes</h3>
          <div className="card mb-3" key={recipe.id}>
            <div className="img-zoom">
              <img className="card-img-top" style={{ height: 200 }} src={similarRecipe.imageUrl} alt="" />
            </div>
            <div className="card-body">
              <Link className="card-title text-center" to={`/recipe/${similarRecipe.id}`}>{similarRecipe.title}</Link>
            </div>
          </div>
        </div>
      )));
    }

    let topChefs;
    let topChefsList;

    if (this.state.topChefs !== null) {
      topChefs = this.state.topChefs.map(chef => ((
        <li className="list-group-item" key={chef.id}>
          <Link className="card-title text-center" to={`/user/${chef.id}`}>{chef.name}</Link>
        </li>
      )));

      if (topChefs.length > 0) {
        topChefsList = (
          <div>
            <h3 className="text-center my-5">Top notch chefs</h3>
            <ul className="list-group">
              {topChefs}
            </ul>
          </div>
        );
      }
    }

    return (
      <div>
        <NavBar {...this.props} />
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8 col-xs-12 col-sm-12">
              {/* Begin card details */}
              {recipeCard}
              {/* End of card details  */}<br /><br /><br /><br />
            </div>
            <div className="col-lg-4 col-sm-12">
              {similarRecipes}
              {topChefsList}
            </div>
          </div>
        </div>
        <Footer />
        <UsersModal {...this.state.usersModal} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) =>
  ({
    recipe: state.recipes.find(recipe => recipe.id === ownProps.params.id),
    indexOfRecipe: state.recipes.findIndex(recipe => recipe.id === ownProps.params.id)
  });

const SingleRecipeContainer = connect(mapStateToProps, null)(SingleRecipe);
export default SingleRecipeContainer;
