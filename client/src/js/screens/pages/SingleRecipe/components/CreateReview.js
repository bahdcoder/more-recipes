import React, { Component } from 'react';

export default class CreateReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: ''
    };

    this.createReview = this.createReview.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async createReview() {
    try {
      await this.props.createReview({
        recipeId: this.props.params.id,
        review: this.state.review
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  handleInputChange(event) {
    
    this.setState({
      review: event.target.value
    });
  }

  render() {
    return (
      <div>
        {/* Begin create reviews section */}
        <h3 className="mb-3 mt-3 text-muted">Leave a review</h3>
        <textarea cols={5} 
                  rows={5} 
                  className="form-control" 
                  placeholder="Leave a review for this recipe..." 
                  value={this.state.review}
                  onChange={this.handleInputChange} />
        <button className="btn btn-primary btn-sm mt-3 float-right"
                disabled={this.state.review.length < 10}
                onClick={this.createReview}>Save review</button>
        {/* End create review section */}
      </div>
    );
  }
}
