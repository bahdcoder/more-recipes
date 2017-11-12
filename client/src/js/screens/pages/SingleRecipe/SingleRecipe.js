import axios from 'axios';
import React, { Component } from 'react';

import config from './../../../config';
import NavBar from './../../components/Navbar';
import Footer from './../../components/Footer';
import SingleRecipeLoader from './../../components/SingleRecipeLoader';

export default class SingleRecipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: null
    };
  }
  /**
   * Fetch the recipe once the component is mounted.
   * 
   * @memberof SingleRecipe
   */
  async componentDidMount() {

    // Try to find the recipe in redux store.
    // if its not there, fire an ajax request with axios. 
    try {
      const response = await axios.get(`${config.apiUrl}/recipes/${this.props.params.id}`);
      
      this.setState({
        recipe: response.data.data.recipe
      });
    } catch (error) {
      if (error.status === 404) {
        // if the recipe is not found from ajax request, redirect user to 404 page.
        
        console.log('recipe was not found.');
      }

      console.log(error.response);
    }
  }
  

  render() {

    let recipeCard = (
      <SingleRecipeLoader />
    );

    if (this.state.recipe) {
      recipeCard = (
        <div className="wow fadeIn card">
          <img className="card-img-top" style={{height: 450}} src="../../assets/img/meal-1.jpg" alt="Card image cap" />
          <div className="card-body">
            <h1 className="card-title text-center h4 mb-4">Emergency Jollof and Coconut stew
              <small className="text-muted" style={{fontSize: 15}}>   
                <i className="ion ion-clock ml-4 mr-1" />
                2 min
              </small>
            </h1>
            <p className="text-center my-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
            </p>
            <hr />
            <div className="media text-center mx-auto my-5" style={{width: 200}}>
              <img className="d-flex mr-3" style={{width: 60, height: 60, borderRadius: '100%'}} src="http://i.pravatar.cc/300" alt="Recipe author avatar" />
              <div className="media-body">
                <h5 className="mt-3">Kati Frantz</h5>
              </div>
            </div>
            <p className="text-muted h6 text-center my-4">
              <span className="mr-3 h3"><i className="ion ion-happy-outline" /> 531,233 </span>
              <span className="mr-3 h3"><i className="ion ion-sad-outline" /> 0</span>
              <span className="mr-3 h3"><i className="ion ion-ios-heart" /> 33</span>
            </p>
            <hr />
            {/* Begin ingredients section */}
            <h3 className="mb-3 text-muted">Ingredients</h3>
            <ul className="list-group mt-3">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            {/* End ingredients section */}
            {/* Begin procedures section */}
            <h3 className="mb-3 mt-3 text-muted">Procedure</h3>
            <ul className="list-group my-3">
              <li className="list-group-item"><span className="badge badge-primary">1</span>   Cras justo odio</li>
              <li className="list-group-item"><span className="badge badge-primary">2</span> Dapibus ac facilisis in</li>
              <li className="list-group-item"><span className="badge badge-primary">3</span> Morbi leo risus</li>
              <li className="list-group-item"><span className="badge badge-primary">4</span> Porta ac consectetur ac</li>
              <li className="list-group-item"><span className="badge badge-primary">5</span> Vestibulum at eros</li>
            </ul>
            <h3 className="my-3 text-muted">Reviews</h3>
            {/* End procedures section */}
            {/* Reviews section */}
            <div className="container my-4">
              <div className="row justify-content-center">
                <div className="col-10">
                  <div className="media">
                    <img className="d-flex mr-3" style={{width: 60, height: 60, borderRadius: '100%'}} src="http://i.pravatar.cc/300" alt="Recipe author avatar" />
                    <div className="media-body">
                      I have just one thing to tell you. Please go to medical school, you have no hope in cooking.
                    </div>
                  </div>
                  <hr />
                  <div className="media">
                    <img className="d-flex mr-3" style={{width: 60, height: 60, borderRadius: '100%'}} src="http://i.pravatar.cc/300" alt="Recipe author avatar" />
                    <div className="media-body">
                      If not that am a christian ehn, I would just pray juju for your head now. Wetin be this ???!😨😨 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End reviews section */}
            {/* Begin create reviews section */}
            <h3 className="mb-3 mt-3 text-muted">Leave a review</h3>
            <textarea cols={5} rows={5} className="form-control" placeholder="Leave a review for this recipe..." defaultValue={""} />
            <button className="btn btn-primary btn-sm mt-3 float-right">Save review</button>
            {/* End create review section */}
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavBar {...this.props}/>
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8 col-xs-12 col-sm-12">
              {/* Begin card details */}
              {recipeCard}
              {/* End of card details  */}
            </div>
            <div className="col-lg-4 col-xs-12">
              <h3 className="text-center my-5">Similar recipes</h3>
              <div className="card mb-3">
                <div className="img-zoom">
                  <img className="card-img-top" style={{height: 200}} src="../../assets/img/meal-3.jpg" alt="Card image cap" />                
                </div>
                <div className="card-body">
                  <h6 className="card-title text-center">
                    <a href="single-recipe.html">Italian Pepperonni with mushroom coverings</a>
                  </h6>
                </div>
              </div>
              <div className="card mb-3">
                <div className="img-zoom">
                  <img className="card-img-top" style={{height: 200}} src="../../assets/img/meal-2.jpg" alt="Card image cap" />                
                </div>
                <div className="card-body">
                  <h6 className="card-title text-center">
                    <a href="single-recipe.html">Pressurized African Cassava Golden Grains</a>
                  </h6>
                </div>
              </div>
              <h3 className="text-center my-5">Top notch chefs</h3>
              <ul className="list-group">
                <li className="list-group-item"><span className="card-title">Kati Frantz</span></li>
                <li className="list-group-item"><span className="card-title">Irene Myers</span></li>
                <li className="list-group-item"><span className="card-title">Doctor Strange</span></li>
                <li className="list-group-item"><span className="card-title">Nadine Almendi F.</span></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}
