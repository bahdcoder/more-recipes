/* global expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import RecipeRow from './index';
import mockRecipes from './../../mock/recipes.json';

describe('The RecipeRow component', () => {
  it('Should mount without crashing', () => {
    const tree = renderer.create((
      <MemoryRouter>
        <RecipeRow recipes={mockRecipes} />
      </MemoryRouter>
    )).toJSON();

    expect(tree.children.length).toBe(3);
    expect(tree).toMatchSnapshot();
  });
});
