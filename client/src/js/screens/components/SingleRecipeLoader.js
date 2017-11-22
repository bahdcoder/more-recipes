import React, { Component } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader';

export default class SingleRecipeLoader extends Component {
  render() {
    return (
      <div>
        <ContentLoader 
          speed={1} 
          primaryColor={'#f5d2bd'} 
          secondaryColor={'#f9e0d2'}
          width={680}
          height={700}>
        <Rect 
          height={400}
          width={680} />
          <Rect y={420} width={10} radius={9} width={680} height={18}/>
          <Rect y={460} width={10} radius={9} width={500} height={18}/>
          <Rect y={500} width={10} radius={9} width={420} height={18}/>
      </ContentLoader>
      </div>
    );
  }
}
