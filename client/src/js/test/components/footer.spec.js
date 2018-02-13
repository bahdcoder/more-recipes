/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import setupTests from '../setupTests';
import Footer from '../../screens/components/Footer';

setupTests();

describe('The Footer component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
