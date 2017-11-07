import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        {/* The navigation bar begin */}
        <section className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="index.html">
              <img src="img/logo.png" className="navbar-logo-img mr-2" alt />
              More-recipes
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="recipes.html">Recipes <span className="sr-only">(current)</span></a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-primary my-2 my-sm-0" type="button">Search</button>
              </form>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="create-recipe.html" className="nav-link create-recipe-link">Create recipe <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <img className="mr-2 navbar-avatar-img" src="http://i.pravatar.cc/300" alt="Recipe author avatar" />
                    Hey, Kati Frantz
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="profile.html">My profile</a>
                    <a className="dropdown-item" href="favorites.html">My favorites</a>
                    <a className="dropdown-item" href="settings.html">Notification settings</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </section>
        {/* The navigation bar ending */}
        {/* The Jumbotron Area */}
        <div className="container-fluid">
          <div className="jumbotron text-center">
            <h1 className="display-3 mb-5">
              <img src="img/logo.png" className="jumbotron-logo-img mr-2" alt />
            </h1>
            <p className="lead jumbotron-title display-4" style={{color: 'white'}}>Making everyday cooking fun !</p>
            <br />
            <p className="lead">
              {/* The home button 
                        If the user is authenticated, let him rather see a create recipe button
                    */}
              <a href="login.html" className="btn btn-primary btn-lg" role="button">Join now</a>
              {/* End of the home button */}
            </p>
          </div>
        </div>
        {/* End of the jumbotron area */}
        {/* Top rated recipes section */}
        <div className="container">
          <h1 className="display-4 text-center">Top Rated Recipes</h1>
          <br />
          <div className="card-deck">
            <div className="card mb-3">
              <img className="card-img-top" style={{height: 250}} src="https://i.imgur.com/KH1os7I.jpg" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title text-center">
                  <a href="single-recipe.html">Pressurized African Cassava Golden Grains ( Garri )</a>
                </h5>
                <hr />
                <p className="text-sm mb-5">
                  <small><span className="text-muted">by</span> Elizabeth  Funkirokeze</small>
                  <span className="text-muted float-right">
                    <i className="ion ion-clock" />
                    35 min</span>
                </p>
                <p className="h6 text-center">
                  <span className="mr-3 h5"><i className="ion ion-happy-outline" /> 12 </span>
                  <span className="mr-3 h5"><i className="ion ion-sad-outline" /> 5,301</span>
                  <span className="mr-3 h5"><i className="ion ion-ios-heart" /> 5,301</span>
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <img className="card-img-top" style={{height: 250}} src="https://i.imgur.com/fU1OmUo.jpg" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title text-center">
                  <a href="single-recipe.html">Emergency Jollof and coconut stew</a>
                </h5>
                <hr />
                <p className="text-sm mb-5">
                  <small><span className="text-muted">by</span> Kati Frantz</small>
                  <span className="text-muted float-right">
                    <i className="ion ion-clock" />
                    2 min</span>
                </p>
                <p className="h6 text-center">
                  <span className="mr-3 h5"><i className="ion ion-happy-outline" /> 12 </span>
                  <span className="mr-3 h5"><i className="ion ion-sad-outline" /> 5,301</span>
                  <span className="mr-3 h5"><i className="ion ion-ios-heart" /> 5,301</span>
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <img className="card-img-top" style={{height: 250}} src="https://i.imgur.com/av7fjeA.jpg" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title text-center">
                  <a href="single-recipe.html">Advanced Abacha and Egg sauce</a>
                </h5>
                <hr />
                <p className="text-sm mb-5">
                  <small><span className="text-muted">by</span> Elizabeth  Funkirokeze</small>
                  <span className="text-muted float-right">
                    <i className="ion ion-clock" />
                    35 min</span>
                </p>
                <p className="h6 text-center">
                  <span className="mr-3 h5"><i className="ion ion-happy-outline" /> 12 </span>
                  <span className="mr-3 h5"><i className="ion ion-sad-outline" /> 5,301</span>
                  <span className="mr-3 h5"><i className="ion ion-ios-heart" /> 5,301</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End of top rated recipes section */}
        <h1 className="mt-3 mb-3" />
      </div>
    );
  }
}
