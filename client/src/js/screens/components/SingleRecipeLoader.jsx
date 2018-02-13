import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader';

const SingleRecipeLoader = () => ((
  <div>
    <ContentLoader
      speed={1}
      primaryColor="#f5d2bd"
      secondaryColor="#f9e0d2"
      width={680}
      height={700}
    >
      <Rect
        height={400}
        width={680}
      />
      <Rect y={420} radius={9} width={680} height={18} />
      <Rect y={460} radius={9} width={500} height={18} />
      <Rect y={500} radius={9} width={420} height={18} />
    </ContentLoader>
  </div>
));

export default SingleRecipeLoader;
