import React from 'react';
import { Link } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import RecipeCard from '../../components/RecipeCard';
import RecipeCardLoader from '../../components/RecipeCardLoader';

import logo from './../../../../assets/img/logo.png';
import avatar from './../../../../assets/img/avatar.jpg';
import bannerImage1 from '../../../../assets/img/banner-1.jpg';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    try {
      await this.props.getHomePageData();

      this.setState({
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    let homeButtons = (
      <span>
        <Link to="/auth/login" className="btn btn-primary btn-lg mr-2" role="button">Sign in</Link>                        
        <Link to="/auth/register" className="btn btn-primary btn-lg" role="button" >Join now </Link>
      </span>  
    );

    if (this.props.authUser) {
      homeButtons = (
        <span>
          <Link to="/recipes/create" className="btn btn-primary btn-lg mr-2"> Create recipe </Link>                        
          <Link to={`user/${this.props.authUser.user.id}/recipes`} className="btn btn-primary btn-lg"> Manage your recipes </Link>
        </span>  
      );
    } 

    let latestRecipes = [];

    if (this.state.loading) {
      latestRecipes = (
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
      let numberOnPage = 3;
      let sortedLatestRecipes = this.props.recipes.sort((recipe1, recipe2) => recipe1.createdAt < recipe2.createdAt);
      if (sortedLatestRecipes.length > 5) {
        numberOnPage = 6;
      }
      let trimmedListOfLatestRecipes = sortedLatestRecipes.slice(0 , numberOnPage);
      latestRecipes = trimmedListOfLatestRecipes.map((recipe) => {
        return (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} {...this.props} />
          </div>
        );
      });
    }

    let mostFavoritedRecipes = [];
    
        if (this.state.loading) {
          mostFavoritedRecipes = (
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
          let numberOnPage = 3;
          let sortedMostFavoritedRecipes = this.props.recipes.sort((recipe1, recipe2) => recipe1.favoritersIds.length < recipe2.favoritersIds.length);
          if (sortedMostFavoritedRecipes.length > 5) {
            numberOnPage = 6;
          }
          let trimmedListOfMostFavoritedRecipes = sortedMostFavoritedRecipes.slice(0 , numberOnPage);
          mostFavoritedRecipes = trimmedListOfMostFavoritedRecipes.map((recipe) => {
            return (
              <div className="col-md-4" key={recipe.id}>
                <RecipeCard recipe={recipe} {...this.props} />
              </div>
            );
          });
        }

    return (
      <div>
        {/* The navigation bar begin */}
        <Navbar {...this.props}/>
        {/* The navigation bar ending */}
        {/* The Jumbotron Area */}
        <div id="jumbotron" className="jumbotron text-center">
          <h1 className="display-3 mb-5">
            <img src={logo} className="jumbotron-logo-img mr-2" />
          </h1>
          <p className="lead jumbotron-title display-4 wow bounceInUp" style={{color: 'white'}}>Making everyday cooking fun !</p>
          <br />
          <p className="lead">
            {/* The home button 
                    If the user is authenticated, let him rather see a create recipe button
                */}
            {homeButtons}
            {/* End of the home button */}
          </p>
        </div>
        {/* End of the jumbotron area */}
        {/* Top rated recipes section */}
        <div className="container-fluid px-5 my-5">
          <h1 className="display-5 text-center my-5 wow fadeInDown" style={{padding: '30px 0px'}}>
            <i className="ion ion-star mr-3" />
            Lastest Recipes</h1>
          <br />
          <div className="card-deck wow fadeIn">
              {latestRecipes}
          </div>
        </div>
        {/* End of top rated recipes section */}
        {/* Top rated chefs section 
        <div className="container px-5 my-5">
          <h1 className="display-5 text-center my-5 wow fadeInDown" style={{padding: '30px 0px'}}>
            <i className="ion ion-person-stalker mr-3" />
            Most Popular Chefs</h1>
          <br />
          <div className="row wow fadeIn">
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src={avatar} />
                <div className="overlay">
                  <p className="my-auto">
                    <a>KATI FRANTZ</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src={avatar}/>
                <div className="overlay">
                  <p className="my-auto">
                    <a >SELINA RYANS</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src={avatar} />
                <div className="overlay">
                  <p className="my-auto">
                    <a>ELLEN MICHEALS</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive rounded" src={avatar} />
                <div className="overlay">
                  <p className="my-auto">
                    <a>CLAUS LEBRONE</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
         End of top rated chefs section */}
        {/* Most favorited recipes section */}
        <div className="container-fluid px-5 my-5">
          <h1 className="display-5 text-center my-5 wow fadeInDown" style={{padding: '30px 0px'}}>
            <i className="ion ion-heart mr-4" />
            Most favorited Recipes</h1>
          <br />
          <div className="card-deck wow fadeIn">
                {mostFavoritedRecipes}
          </div>
        </div>
        <br/><br/><br/>
        {/* End of top rated recipes section */}

        {/*Begin page footer */}
        <Footer/>
        {/* End page footer */}
      </div>
    );
  }
}
