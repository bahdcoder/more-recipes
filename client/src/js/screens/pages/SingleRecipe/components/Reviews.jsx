import PropTypes from 'prop-types';
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
class Reviews extends Component {
  /**
   * Get the paginated reviews for the recipe
   *
   * @memberof SingleRecipe
   * @return {null} null
   */
  async componentWillMount() {
    try {
      await this.props.getRecipeReviews(this.props.params.id);
    } catch (error) {
      //  notify user that review loading failed.
    }
  }

  /**
   * Render jsx for component
   * @return {jsx} jsx
   */
  render() {
    const recipeReviews = this.props.reviews[this.props.params.id] || [];
    let reviews;

    if (recipeReviews.length > 0) {
      reviews = recipeReviews.map(review => ((
        <div key={review.id} className="wow fadeInUp">
          <div className="ml-3 media">
            <Gravatar
              className="d-flex mr-3"
              style={{ width: 60, height: 60, borderRadius: '100%' }}
              email={review.User.email}
            />
            <div className="media-body">
              <h6 className="font-weight-bold">{review.User.name}<small className="text-muted ml-2">{distanceInWordsToNow(review.createdAt)} ago</small></h6>
              <div className="review-body">{review.review}</div>
            </div>
          </div>
          <hr />
        </div>
      )));
    } else {
      reviews = (
        <div
          className="text-center font-weight-bold"
        >
          No reviews yet.
        </div>
      );
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

Reviews.propTypes = {
  getRecipeReviews: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.any).isRequired,
  reviews: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.any))
};

Reviews.defaultProps = {
  reviews: {}
};

export default Reviews;
