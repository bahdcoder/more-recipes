import React, { Component } from 'react';

import { Link } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from './../../components/RecipeCard';
import RecipeCardLoader from './../../components/RecipeCardLoader';

export default class UserRecipes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    try {
      await this.props.getUserRecipes(this.props.params.id);
      
      this.setState({
        loading: false
      });
    } catch (error) {
      console.log(error.response);
    }
  }


  render() {
    let recipes;
    let isAuthUserRecipes = false;
    let user = this.props.users.find(u => u.id === this.props.params.id);
    let pageHeading;


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
      let userRecipes = this.props.recipes.filter(recipe => recipe.User.id === this.props.params.id);
      recipes = userRecipes.map((recipe) => {
        return (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} {...this.props} />
            <div className="btn-group btn-group-sm" role="group">
              <Link className="btn btn-primary btn-xs" to={`/recipe/${recipe.id}/edit`}>Update recipe</Link>
              <button className="btn btn-danger btn-xs">Delete recipe</button>
            </div>
          </div>
        );
      });
    }
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
