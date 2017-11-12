import React from 'react';
import { Link } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SignIn from '../../components/auth/SignIn';
import RecipeCard from '../../components/RecipeCard';

import bannerImage1 from '../../../../assets/img/banner-1.jpg';

export default class Home extends React.Component {
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
          <Link to="/" className="btn btn-primary btn-lg" role="button"> View your recipes </Link>
        </span>  
      );
    } 
    
    return (
      <div>
        {/* The navigation bar begin */}
        <Navbar {...this.props}/>
        {/* The navigation bar ending */}
        {/* The Jumbotron Area */}
        <div id="jumbotron" className="jumbotron text-center">
          <h1 className="display-3 mb-5">
            <img src="../../../assets/img/logo.png" className="jumbotron-logo-img mr-2" />
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
          <h1 className="display-4 text-center my-5 wow fadeInDown" style={{padding: '30px 0px'}}>
            <i className="ion ion-star mr-3" />
            Top Rated Recipes</h1>
          <br />
          <div className="card-deck wow fadeIn">
            <RecipeCard/>     
            <RecipeCard/>     
            <RecipeCard/>                        
          </div>
        </div>
        {/* End of top rated recipes section */}
        {/* Top rated chefs section */}
        <div className="container px-5 my-5">
          <h1 className="display-4 text-center my-5 wow fadeInDown" style={{padding: '30px 0px'}}>
            <i className="ion ion-person-stalker mr-3" />
            Most Popular Chefs</h1>
          <br />
          <div className="row wow fadeIn">
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src="http://i.pravatar.cc/300" />
                <div className="overlay">
                  <p className="my-auto">
                    <a>KATI FRANTZ</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src="http://i.pravatar.cc/300"/>
                <div className="overlay">
                  <p className="my-auto">
                    <a >SELINA RYANS</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src="http://i.pravatar.cc/300" />
                <div className="overlay">
                  <p className="my-auto">
                    <a>ELLEN MICHEALS</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div className="hovereffect">
                <img className="img-fluid img-responsive" src="http://i.pravatar.cc/300" />
                <div className="overlay">
                  <p className="my-auto">
                    <a>CLAUS LEBRONE</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End of top rated chefs section */}
        {/* Most favorited recipes section */}
        <div className="container-fluid px-5 my-5">
          <h1 className="display-4 text-center my-5 wow fadeInDown" style={{padding: '30px 0px'}}>
            <i className="ion ion-heart mr-4" />
            Most favorited Recipes</h1>
          <br />
          <div className="card-deck wow fadeIn">
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>            
          </div>
        </div>
        {/* End of top rated recipes section */}
        <SignIn data={this.props}/>
        {/*Begin page footer */}
        <Footer/>
        {/* End page footer */}
        <div className="modal fade" id="registerModal" tabIndex={-1} role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document" style={{paddingTop: 70}}>
            <div className="modal-content">
              <div className="modal-body text-center">
                <div className="row justify-content-center">
                  <div className="col-10">
                    <form>
                      <h3 className="text-center mb-3 mt-3">Register</h3>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="First name" />                                    
                      </div>  
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Last name" />                                    
                      </div>  
                      <div className="form-group">
                        <input type="email" className="form-control" id="staticEmail" placeholder="email@example.com" />                                    
                      </div>  
                      <div className="form-group">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />                                    
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Confirm Password" />                                    
                      </div>
                      <div className="form-group text-center">
                        <button className="btn mb-3 btn-primary form-control" type="submit">Register</button>   
                        <span className="mt-5 h6 mr-3"><a role="button" data-toggle="modal" data-target="#exampleModal" data-dismiss="modal">Have an account? Login</a></span>                              
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
