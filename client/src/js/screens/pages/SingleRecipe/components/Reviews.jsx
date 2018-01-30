import Gravatar from 'react-gravatar';
import React, { Component } from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { Scrollbars } from 'react-custom-scrollbars';

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
          <div key={review.id} className="wow fadeInUp">
            <div className="ml-3 media">
              <Gravatar className="d-flex mr-3"
                style={{ width: 60, height: 60, borderRadius: '100%' }}
                email={review.User.email} />
              <div className="media-body">
                <h6 className="font-weight-bold">{review.User.name}<small className="text-muted ml-2">{distanceInWordsToNow(review.createdAt)} ago</small></h6>
                {review.review}
              </div>
            </div>
            <hr />
          </div>
        );
      });
    } else {
      reviews = (<div className="text-center font-weight-bold">
        No reviews yet.
    </div>);
    }

    return (
      <div>
        <Scrollbars style={{ height: 250 }}>
          <div className="container my-4">
            <div className="row">
              <div className="col-10">
                {reviews}
              </div>
            </div>
          </div>
        </Scrollbars>
        <CreateReview {...this.props} />

      </div>
    );
  }
}
