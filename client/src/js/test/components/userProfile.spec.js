/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount, shallow } from 'enzyme';
import UserProfile from '../../screens/pages/UserProfile/UserProfile';

import setupTests from '../setupTests';
import UserProfileLoader from '../../screens/pages/UserProfile/components/UserProfileLoader';

setupTests();

describe('The UserProfile component', () => {
  const props = {
    authUser: {
      user: { id: 1, name: 'test user' }
    },
    params: { id: 1 },
    users: [{
      id: 1,
      name: 'test user',
      recipes: [],
      email: 'test@user.com',
      about: '',
      settings: {
        reviewEmails: 1,
        favoriteModifiedEmail: 1
      }
    }],
    findUser() {},
    updateUserProfile() {},
    triggerGetRecipesCatalog() { },
    changeRouterQueryParams() { },
    router: {},
    signOut() { },
    location: { query: { query: '' }, pathname: '' }
  };
  test('should mount without crashing', () => {
    const tree = shallow(<UserProfile {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('Should show editing forms when component is in editing mode', () => {
    const wrapper = mount(<UserProfile {...props} />);
    wrapper.find('#startEditing').simulate('click');
    expect(wrapper.state().editing).toBe(true);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('input').length).toBe(4);
  });
  test('Should save changes when save changes button is clicked', () => {
    const wrapper = mount(<UserProfile {...props} />);
    wrapper.find('#startEditing').simulate('click');

    const userIndex = 0;

    const spy = jest.spyOn(wrapper.instance(), 'saveChanges');
    wrapper.find('#saveChanges').simulate('click');
    expect(spy).toHaveBeenCalledWith(userIndex);
  });
  test('Should mount loader when user is not found', () => {
    const userNotFoundProps = {
      ...props,
      users: []
    };
    const wrapper = mount(<UserProfile {...userNotFoundProps} />);
    expect(wrapper.contains(<UserProfileLoader />)).toBe(true);
  });
});
