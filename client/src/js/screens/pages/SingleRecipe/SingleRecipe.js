import axios from 'axios';
import numeral from 'numeral';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';
import React, { Component } from 'react';

import config from './../../../config';

import Reviews from './components/Reviews';
import NavBar from './../../components/Navbar';
import Footer from './../../components/Footer';
import RecipeActions from './../../components/RecipeActions';
import SingleRecipeLoader from './../../components/SingleRecipeLoader';

import meal1 from './../../../../assets/img/meal-3.jpg';
import meal2 from './../../../../assets/img/meal-2.jpg';
import RecipeCardLoader from './../../components/RecipeCardLoader';

export default class SingleRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      reviews: [],
      loading: true,
      canActOnRecipe: true,
      topChefs: null,
      similarRecipes: null
    };

    this.toggleUpvote = this.toggleUpvote.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
    this.checkIfCanActOnRecipe = this.checkIfCanActOnRecipe.bind(this);    
  }

  async toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter) {
    if (!this.state.canActOnRecipe) {
      return;
    }
    try {
      const response = await this.props.toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter, this.props.params.id);
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Fetch the recipe once the component is mounted.
   * 
   * @memberof SingleRecipe
   */
  async componentWillMount() {

    // Try to find the recipe in redux store.
    const indexOfRecipe = this.props.recipes.findIndex(recipe => recipe.id === this.props.params.id);
    // if its not there, fire an ajax request with axios.
    if (indexOfRecipe === -1) {
      try {
        const response = await axios.get(`${config.apiUrl}/recipes/${this.props.params.id}`);
        const recipe = response.data.data.recipe;
        //  Check if the current user is authorized to act on the recipe
       this.checkIfCanActOnRecipe(recipe);

        await this.props.updateRecipesInStore(recipe);
        const searchResponse = await axios.get(`${config.apiUrl}/recipes?query=${recipe.title}`);
        let { recipes } = searchResponse.data.data.recipes;
        recipes = recipes.filter(r => r.id !== recipe.id);
        console.log(recipes);
        this.setState({
          similarRecipes: recipes
        });
      } catch (error) {
        if (error.status === 404) {
          // if the recipe is not found from ajax request, redirect user to 404 page.
          
          console.log('recipe was not found.');
        }
  
        console.log(error.response);
      }
    } else {
      let recipe = this.props.recipes[indexOfRecipe];
      this.checkIfCanActOnRecipe(recipe);
    }
  }

  async componentDidMount() {
    window.scroll(0, 0);
    try {
      const response = await axios.get(`${config.apiUrl}/recipes?sort=mostFavorited&perPage=4`);
      const { recipes } = response.data.data.recipes;
      const topChefs = recipes.map((recipe) => {
        return recipe.User;
      });
      const uniqueChefs = [];
      topChefs.forEach(chef => {
        if(uniqueChefs.findIndex(c => c.id === chef.id) === -1) {
          uniqueChefs.push(chef);
        }
      });
      this.setState({
        topChefs: uniqueChefs
      });
    } catch (errors) {

    }
  }
  

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

  async toggleUpvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter) {
    if (!this.state.canActOnRecipe) {
      return;
    }
    try {
      const response = await this.props.toggleUpvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter, this.props.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  async toggleDownvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter) {
    if (!this.state.canActOnRecipe) {
      return;
    }
    try {
      const response = await this.props.toggleDownvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter, this.props.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    let recipeCard;
    let recipe;


    const indexOfRecipe = this.props.recipes.findIndex(recipe => recipe.id === this.props.params.id);

    if (indexOfRecipe === -1) {
      recipeCard = (
        <SingleRecipeLoader />
      );
    } else {
      recipe = this.props.recipes[indexOfRecipe];
    }

    

    let ingredients;

    if (recipe) {
      ingredients = JSON.parse(recipe.ingredients).map((ingredient, index) => {
        return (<li key={index} className="list-group-item">{ingredient}</li>);
      });
    }

    let procedure;

    if (recipe) {
      procedure = JSON.parse(recipe.procedure).map((step, index) => {
        return (
          <li key={index} className="list-group-item"><span className="badge badge-primary">{index + 1}</span>   {step}</li>
        );
      });
    }

    if (recipe) {
      let hasFavorited = false;
      let hasUpvoted = false;
      let hasDownvoted = false;
      
      let indexOfFavoriter;
      let indexOfUpvoter;
      let indexOfDownvoter;
      

      if (this.props.checkAuth()) {
        indexOfFavoriter = recipe.favoritersIds.findIndex(userId => userId === this.props.authUser.user.id)
        if (indexOfFavoriter !== -1) {
          hasFavorited = true;
        }
        indexOfUpvoter = recipe.upvotersIds.findIndex(userId => userId === this.props.authUser.user.id);
        if (indexOfUpvoter !== -1) {
          hasUpvoted = true;
        }
  
        indexOfDownvoter = recipe.downvotersIds.findIndex(userId => userId === this.props.authUser.user.id);
        if (indexOfDownvoter !== -1) {
          hasDownvoted = true;
        }
      }
      
      recipeCard = (
        <div className="wow fadeIn card">
          <img className="card-img-top" style={{height: 450}} src={recipe.imageUrl} alt={recipe.title} />
          <div className="card-body">
            <h1 className="card-title text-center h4 mb-4">{recipe.title}
              <small className="text-muted" style={{fontSize: 15}}>   
                <i className="ion ion-clock ml-4 mr-1" />
                {recipe.timeToCook}
              </small>
            </h1>
            <p className="text-center my-4">
              {recipe.description}
            </p>
            <hr />
            <div className="media text-center mx-auto my-5" style={{width: 200}}>
              <Gravatar className="d-flex mr-3" 
                        email={recipe.User.email}
                        style={{width: 60, height: 60, borderRadius: '100%'}}/>
              <div className="media-body">
                <p className="h6 mt-3">
                <Link style={ { textDecoration: 'none', color: '#000' } } to={`/user/${recipe.User.id}`}>{recipe.User.name}</Link>
                </p>
              </div>
            </div>
            <p className="text-muted h4 text-center my-4">
              <span className="mr-3 h1">
                <i className={ hasUpvoted ? "ion ion-happy ion-recipe-action" : "ion ion-recipe-action ion-happy-outline" }
                   onClick={(event) => { this.toggleUpvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter); }}> </i> 
                 
                <span className="ml-3">{numeral(recipe.upvotersIds.length).format('0a')}</span>
              </span>
              <span className="mr-3 h1">
                <i className={ hasDownvoted ? "ion ion-sad ion-recipe-action" : "ion ion-recipe-action ion-sad-outline" }
                   onClick={() => { this.toggleDownvote(indexOfRecipe, hasUpvoted, hasDownvoted, indexOfUpvoter, indexOfDownvoter); }}> </i> 
                 
                <span className="ml-3">{numeral(recipe.downvotersIds.length).format('0a')}</span>
              </span>
              <span className="mr-3 h1">
                <i className={ hasFavorited ? "ion ion-ios-heart ion-recipe-action" : "ion ion-recipe-action ion-ios-heart-outline" }
                   onClick={() => { this.toggleFavorite(indexOfRecipe, hasFavorited, indexOfFavoriter); }}> </i> 
                <span className="ml-3">{numeral(recipe.favoritersIds.length).format('0a')} </span>
              </span>
            </p>
            <hr />
            {/* Begin ingredients section */}
            <h3 className="mb-4 text-muted">Ingredients</h3>
            <ul className="list-group mt-3">
              {ingredients}
            </ul>
            <br/>
            {/* End ingredients section */}
            {/* Begin procedures section */}
            <h3 className="mb-4 mt-3 text-muted">Procedure</h3>
            <ul className="list-group my-3">
              {procedure}
            </ul>
            <br/>
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
    if(this.state.similarRecipes !== null && this.state.similarRecipes.length > 0) {
      similarRecipes = this.state.similarRecipes.map(recipe => {
        return (
          <div>
            <h3 className="text-center my-3">Similar recipes</h3>
            <div className="card mb-3" key={recipe.id}>
              <div className="img-zoom">
                <img className="card-img-top" style={{height: 200}} src={recipe.imageUrl} />                
              </div>
              <div className="card-body">
                <Link className="card-title text-center" to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
              </div>
            </div>
          </div>
        );
      });
    }

    let topChefs;
    let topChefsList;

    if(this.state.topChefs !== null) {
      topChefs = this.state.topChefs.map(chef => {
        return (
          <li className="list-group-item" key={chef.id}>
            <Link className="card-title text-center" to={`/user/${chef.id}`}>{chef.name}</Link>
          </li>
        );
      });

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
        <NavBar {...this.props}/>
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8 col-xs-12 col-sm-12">
              {/* Begin card details */}
              {recipeCard}
              {/* End of card details  */}<br/><br/><br/><br/>
            </div>
            <div className="col-lg-4 col-sm-12">
              {similarRecipes}
              {topChefsList}
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}
