/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';

import RecipeCard from '../../screens/components/RecipeCard';

import setupTests from '../setupTests';

setupTests();

describe('The RecipeCard component', () => {
  test('should mount without crashing', () => {
    const recipe = {
      id: '3d1b8ff7-b319-4192-b83b-46a0b6357a75',
      title: 'Sit quos quam.',
      userId: '6143df8b-12c3-4c9b-80ca-f9766a74bd4c',
      description: 'Quisquam est veniam iusto.',
      imageUrl: 'http://lorempixel.com/640/480',
      timeToCook: 21763,
      ingredients: '["Laborum ut et dolorem."',
      procedure: '["Molestias ratione omnis nobis tenetur."]',
      User: {
        id: '392887bc-e001-471f-a2ea-d3318e9cead9',
        name: 'Lula Jaskolski',
        email: 'Cristian_Bruen43@gmail.com',
        about: 'atibus ad laborum eos.'
      },
      upvotersIds: [
        'ff2355bf-d16a-4f92-bf4a-2b20c3d7eeca',
        '6aa6d872-3a9e-4022-b4fe-4838dc5e95b7'
      ],
      favoritersIds: ['5d3f1a99-c86a-4c63-a2fc-2257cf7cf4de'],
      downvotersIds: ['7428d9e4-eb13-4a5d-8a93-f9b8c209b61d']
    };
    const wrapper = renderer.create(<RecipeCard recipe={recipe} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
