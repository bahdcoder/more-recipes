/* global expect */
import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './index';

it('The footer renders without crashing', () => {
  const tree = renderer.create((
    <Footer />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
