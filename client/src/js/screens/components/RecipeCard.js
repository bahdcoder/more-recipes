import React from 'react';
import { Link } from 'react-router';

export default class RecipeCard extends React.Component {
  render() {
    return (
      <div className="card mb-3">
        <div className="img-zoom">
          <img className="card-img-top" style={{height: 250}} src="../../assets/img/meal-1.jpg" alt="Card image cap" />                
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">
            <Link to="/recipe/1234">Pressurized African Cassava Golden Grains ( Garri )</Link>
          </h5>
          <hr />
          <p className="text-sm mb-5">
            <small><span className="text-muted">by</span> Elizabeth  Funkirokeze</small>
            <span className="text-muted float-right">
              <i className="ion ion-clock mr-2" />
              35 min</span>
          </p>
          <p className="h6 text-center">
            <span className="mr-3 h5"><i className="ion ion-happy-outline" /> 12 </span>
            <span className="mr-3 h5"><i className="ion ion-sad-outline" /> 5,301</span>
            <span className="mr-3 h5"><i className="ion ion-ios-heart" /> 5,301</span>
          </p>
        </div>
      </div>
    );
  }
}
