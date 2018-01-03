import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './index';

it('The navbar renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
