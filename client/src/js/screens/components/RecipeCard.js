import React from 'react';
import { Link } from 'react-router';

import RecipeActions from './RecipeActions';

export default class RecipeCard extends React.Component {
  render() {
    return (
      <div className="card mb-3">
        <div className="img-zoom">
          <img className="card-img-top" style={{height: 250}} src="../../assets/img/meal-1.jpg" alt="Card image cap" />                
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">
            <Link to="/recipe/36515881-5f1b-4f1e-a8eb-0d5fc56171c8">Pressurized African Cassava Golden Grains ( Garri )</Link>
          </h5>
          <hr />
          <p className="text-sm mb-5">
            <small><span className="text-muted">by</span> Elizabeth  Funkirokeze</small>
            <span className="text-muted float-right">
              <i className="ion ion-clock mr-2" />
              35 min</span>
          </p>
          <RecipeActions classes={'h6 text-center'}
                           subClasses={'mr-3 h3'} 
                           {...this.props}/>
        </div>
      </div>
    );
  }
}
