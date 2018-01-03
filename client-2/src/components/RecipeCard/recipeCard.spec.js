/* global expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import RecipeCard from './index';
import mockRecipes from './../../mock/recipes.json';


describe('The RecipeCard component', () => {
  it('Should render without crashing', () => {
    const tree = renderer.create((
      <MemoryRouter>
        <RecipeCard recipe={{ ...mockRecipes[0] }} />
      </MemoryRouter>
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
