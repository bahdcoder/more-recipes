import React, { Component } from 'react';

export default class RecipeActions extends Component {
  render() {
    //  {numeral(recipe.upvotersIds.length).format('0a')}
    return (
      <p className={this.props.classes}>
        <span className={this.props.subClasses}><i className="ion ion-happy-outline" /> 12 </span>
        <span className={this.props.subClasses}><i className="ion ion-sad-outline" /> 5,301</span>
        <span className={this.props.subClasses}><i className="ion ion-ios-heart" /> 5,301</span>
      </p>
    );
  }
}