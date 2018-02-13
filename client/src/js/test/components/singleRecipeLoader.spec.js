/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import SingleRecipeLoader from '../../screens/components/SingleRecipeLoader';

import setupTests from '../setupTests';

setupTests();

describe('The SingleRecipeLoader component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<SingleRecipeLoader />);
    expect(wrapper).toMatchSnapshot();
  });
});
