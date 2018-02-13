import React, { Component } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader';

const UserProfileLoader = () => ((
  <ContentLoader height={400} width={800} speed={1} primaryColor={'#f9e0d2'} secondaryColor={'#fcf0e9'}>
    <Circle x={405} y={80} radius={50} />
    <Rect x={250} y={190} height={10} radius={5} width={300} />
    <Rect x={280} y={170} height={10} radius={5} width={250} />
    <Rect x={6} y={250} height={50} radius={5} width={790} />
  </ContentLoader>
));

export default UserProfileLoader;
