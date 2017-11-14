import React, { Component } from 'react';
/**
 * The reviews component for the single recipe view
 *
 * @export
 * @class Reviews
 * @extends {Component} React
 */
export default class Reviews extends Component {
  render() {

    console.log(this.props.recipeReviews);

    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-10">
            <div>
              <div className="ml-3 media">
                <img className="d-flex mr-3" style={{width: 60, height: 60, borderRadius: '100%'}} src="http://i.pravatar.cc/300" alt="Recipe author avatar" />
                <div className="media-body">
                  <h6 className="font-weight-bold">Kati Frantz <small className="text-muted ml-2">2 hours ago</small></h6>
                  I have just one thing to tell you. Please go to medical school, you have no hope in cooking.
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
