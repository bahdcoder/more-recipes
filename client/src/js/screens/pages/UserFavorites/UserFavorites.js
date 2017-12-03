import React, { Component } from 'react';

import { Link } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from './../../components/RecipeCard';
import RecipeCardLoader from './../../components/RecipeCardLoader';

export default class UserFavorites extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    try {
      await this.props.getUserFavorites();
      
      this.setState({
        loading: false
      });
    } catch (error) {
      console.log(error.response);
    }
  
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    let recipes;
    let pageHeading;

    if (this.state.loading) {
      recipes = (
        <div className="row">
          <div className="col-md-4">
            <RecipeCardLoader/>
          </div>
          <div className="col-md-4">
            <RecipeCardLoader/>
          </div>
          <div className="col-md-4">
            <RecipeCardLoader/>
          </div>
        </div>
      );
    } else {
      let favoriteRecipes = this.props.recipes.filter(recipe => {
        return recipe.favoritersIds.findIndex(favId => this.props.authUser.user.id === favId) !== -1;
      });
      if (favoriteRecipes.length < 1) {
        recipes = (
          <h4 className="text-center">You have no favorite recipes yet.</h4>
        );
      } else {
        recipes = favoriteRecipes.map((recipe) => {
          return (
            <div className="col-md-4" key={recipe.id}>
              <RecipeCard recipe={recipe} {...this.props} />
            </div>
          );
        });
      }
      
    }
    return (
      <div>
        <Navbar {...this.props} />
        <div className="container my-5">
          <div className="row">
              <div className="col-12">
                  <h1 className="text-center my-5 display-5">
                      My favorite recipes
                  </h1>
                  <div className="container">
                    <div className="row text-center">
                    {recipes}
                    </div>
                  </div>
                  
              </div>
            </div>
          </div>
          <Footer {...this.props} />
      </div>
    );
  }
}
