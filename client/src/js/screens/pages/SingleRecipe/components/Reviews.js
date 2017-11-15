import React, { Component } from 'react';

import CreateReview from './CreateReview';
/**
 * The reviews component for the single recipe view
 *
 * @export
 * @class Reviews
 * @extends {Component} React
 */
export default class Reviews extends Component {

  /**
   * Get the paginated reviews for the recipe
   * 
   * @memberof SingleRecipe
   */
  async componentWillMount() {
    try {
      const response = await this.props.getRecipeReviews(this.props.params.id); 
    } catch (error) {
      console.log('load reviews error:', error);
    }
  }
  render() {
    let recipeReviews = this.props.reviews[this.props.params.id] || [];
    let reviews;
    
    if (recipeReviews.length > 0) {
      reviews = recipeReviews.map(review => {
        return (
          <div key={review.id}>
            <div className="ml-3 media">
              <img className="d-flex mr-3" style={{width: 60, height: 60, borderRadius: '100%'}} src="http://i.pravatar.cc/300" alt="Recipe author avatar" />
              <div className="media-body">
                <h6 className="font-weight-bold">Kati Frantz <small className="text-muted ml-2">2 hours ago</small></h6>
                {review.review}
              </div>
            </div>
            <hr />
          </div>
        );
      });
    } else {
    reviews = ( <div className="text-center font-weight-bold">
      No reviews yet.
    </div> );
    }

    return (
      <div>
        <div className="container my-4">
          <div className="row">
            <div className="col-10">
              {reviews}
            </div>
          </div>
        </div>
        <CreateReview {...this.props}/>
      </div>
    );
  }
}
