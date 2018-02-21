import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'; // eslint-disable-line import/no-extraneous-dependencies

import { Link } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from './../../components/RecipeCard';
import RecipeCardLoader from './../../components/RecipeCardLoader';

import { deleteRecipe } from '../../../store/actions/actionCreators';
/**
 * UserRecipes component
 */
class UserRecipes extends Component {
  static propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
    authUser: PropTypes.objectOf(PropTypes.any),
    user: PropTypes.objectOf(PropTypes.any),
    userRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    router: PropTypes.objectOf(PropTypes.any).isRequired
  };
  static defaultProps = {
    authUser: {},
    user: {}
  };
  /**
   * Initialize component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      deleting: false,
      recipeDeleting: {}
    };
  }
  /**
   * Execute after component mounts
   * @returns {null} null
   */
  async componentWillMount() {
    await this.props.getUserRecipes(this.props.params.id);

    this.setState({
      loading: false
    });
  }
  /**
   * Execute after component has mounted.
   * @returns {null} null
   */
  componentDidMount() {
    window.scroll(0, 0);
  }
  /**
   * Show alert to delete recipe
   * @param {object} recipe
   * @returns {null} null
   */
  deleteUserRecipe(recipe) {
    this.setState({ deleting: true, recipeDeleting: recipe });
  }

  /**
   * Render user recipes
   * @returns {jsx} jsx
   */
  render() {
    let recipes;
    let isAuthUserRecipes = false;
    const { user } = this.props;
    let pageHeading;

    if (!this.props.authUser) {
      return this.props.router.push('/');
    }


    if (user) {
      if (user.id === this.props.authUser.user.id) {
        isAuthUserRecipes = true;

        pageHeading = 'My Recipes';
      } else {
        pageHeading = `${user.name}'s Recipes`;
      }
    } else {
      pageHeading = 'Recipes';
    }

    if (this.state.loading) {
      recipes = (
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
      const { userRecipes } = this.props;
      recipes = userRecipes.map(recipe => (
        <div className="col-md-4" key={recipe.id}>
          <RecipeCard recipe={recipe} {...this.props} />
          {
            isAuthUserRecipes &&
            <div className="btn-group btn-group-sm" role="group">
              <Link className="btn btn-primary btn-xs" to={`/recipe/${recipe.id}/edit`}>Update recipe</Link>
              <button className="btn btn-danger btn-xs" onClick={() => { this.deleteUserRecipe(recipe); }}>Delete recipe</button>
            </div>
          }
        </div>
      ));
    }

    const noRecipes = <h3 className="text-center">No recipes yet.</h3>;
    return (
      <div>
        <Navbar {...this.props} />
        <div className="container my-5">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center my-5 display-5">
                {pageHeading}
              </h1>
              <div className="container">
                <div className="row">
                  {recipes.length >= 1 ? recipes : noRecipes}
                </div>
              </div>

            </div>
          </div>
        </div>
        <br />
        <br />
        <Footer {...this.props} />
        <SweetAlert
          show={this.state.deleting}
          title="Delete recipe"
          showCancelButton
          onConfirm={() => {
            this.props.deleteRecipe(this.state.recipeDeleting.id);
            this.setState({ deleting: false });
          }}
          onCancel={() => { this.setState({ deleting: false }); }}
          text={`Are you sure you want to delete ${this.state.recipeDeleting.title} ? This action is irreversible.`}
        />

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) =>
  ({
    userRecipes: state.recipes.filter(recipe => recipe.User.id === ownProps.params.id),
    user: state.users.find(user => user.id === ownProps.params.id)
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteRecipe }, dispatch);

const UserRecipesContainer = connect(mapStateToProps, mapDispatchToProps)(UserRecipes);

export default UserRecipesContainer;
