import PropTypes from 'prop-types';
import { Link } from 'react-router';
import React, { Component } from 'react';

/**
 * Create Review component
 */
class CreateReview extends Component {
  /**
   * Create review initialization
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      review: ''
    };

    this.createReview = this.createReview.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  /**
   * Create a review
   * @return {null} null
   */
  async createReview() {
    await this.props.createReview({
      recipeId: this.props.params.id,
      review: this.state.review
    });

    this.setState({
      review: ''
    });
  }

  /**
   * Handle input change
   * @param {object} event
   * @return {null} null
   */
  handleInputChange(event) {
    this.setState({
      review: event.target.value
    });
  }

  /**
   * Render crearte review component
   * @return {jsx} jsx
   */
  render() {
    let createReview;
    if (this.props.checkAuth()) {
      createReview = (
        <div>
          <h3 className="mb-3 mt-3 text-muted">Leave a review</h3>
          <textarea
            cols={5}
            rows={5}
            className="form-control"
            placeholder="Leave a review for this recipe..."
            value={this.state.review}
            onChange={this.handleInputChange}
          />
          <button
            className="btn btn-primary btn-sm mt-3 float-right"
            disabled={this.state.review.length < 10}
            onClick={this.createReview}
          >Save review
          </button>
        </div>
      );
    } else {
      createReview = (
        <h1 className="text-center text-muted"><Link to="/auth/login" style={{ textDecoration: 'none' }}>Sign in</Link> to leave a review</h1>
      );
    }


    return (
      <div>
        {/* Begin create reviews section */}
        {createReview}

        {/* End create review section */}
      </div>
    );
  }
}

CreateReview.propTypes = {
  createReview: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.any).isRequired,
  checkAuth: PropTypes.func.isRequired
};

export default CreateReview;
