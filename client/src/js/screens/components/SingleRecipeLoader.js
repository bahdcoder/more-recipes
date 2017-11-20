import React, { Component } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader';

export default class SingleRecipeLoader extends Component {
  render() {
    return (
      <div>
        <ContentLoader 
          speed={1} 
          primaryColor={'#f2c3a6'} 
          secondaryColor={'#eba57a'}
          width={680}
          height={700}>
        <Rect 
          height={400}
          width={680} />
      </ContentLoader>
      </div>
    );
  }
}
