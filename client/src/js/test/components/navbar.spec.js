/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount } from 'enzyme';

import setupTests from '../setupTests';
import Navbar from '../../screens/components/Navbar';

setupTests();

describe('The Navbar component', () => {
  const signedOutProps = {
    authUser: null,
    triggerGetRecipesCatalog() { },
    changeRouterQueryParams() { },
    router: {},
    signOut() { },
    location: { query: { query: '' }, pathname: '' }
  };
  const signedInProps = {
    authUser: {
      access_token: '',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@user.com'
      }
    },
    triggerGetRecipesCatalog: () => {},
    changeRouterQueryParams() { },
    router: { push() {} },
    signOut() { },
    location: { query: { query: '' }, pathname: '/recipes' }
  };
  test('should mount without crashing', () => {
    const tree = shallow((
      <div>
        <Navbar {...signedInProps} />
      </div>
    ));
    expect(tree).toMatchSnapshot();
  });
  test('should display user information if logged in', () => {
    const wrapper = mount(<Navbar {...signedInProps} />);
    expect(wrapper.find('.dropdown-menu').length).toBe(1);
  });
  test('should not display user information if logged in', () => {
    const wrapper = mount(<Navbar {...signedOutProps} />);
    expect(wrapper.find('.dropdown-menu').length).toBe(0);
  });
  test.skip('should call triggerGetRecipesCatalog function when search recipes form is submitted', () => {
    const wrapper = mount(<Navbar {...signedInProps} />);
    const spy = jest.spyOn(signedInProps, 'triggerGetRecipesCatalog');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
});
