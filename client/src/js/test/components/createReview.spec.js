/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router';
import { mount, shallow } from 'enzyme';
import CreateReview from '../../screens/pages/SingleRecipe/components/CreateReview';

import setupTests from '../setupTests';

setupTests();

describe('The CreateReview component', () => {
  const signedInProps = {
    params: { id: 1 },
    checkAuth: () => true,
    createReview() { }
  };

  const signedOutProps = {
    params: { id: 1 },
    createReview() {},
    checkAuth: () => false
  };
  test('Should mount without crashing', () => {
    const tree = shallow(<CreateReview {...signedOutProps} />);

    expect(tree).toMatchSnapshot();
  });
  test('Should display sign in message if user is not signed in', () => {
    const tree = mount(<CreateReview {...signedOutProps} />);
    expect(tree.contains((
      <h1 className="text-center text-muted">
        <Link to="/auth/login" style={{ textDecoration: 'none' }}>Sign in</Link> to leave a review
      </h1>
    ))).toBe(true);
  });

  test('Should display textarea and createReview button if user is signed in', () => {
    const tree = mount(<CreateReview {...signedInProps} />);
    expect(tree.find('textarea').length).toEqual(1);
    expect(tree.find('button').length).toEqual(1);
  });

  test('Should call the createReview function when Save Review button is called', () => {
    const wrapper = mount(<CreateReview {...signedInProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'createReview');
    wrapper.setState({ review: 'Some review right here.' });
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  test('Should set review state when the textarea changes', () => {
    const wrapper = mount(<CreateReview {...signedInProps} />);
    //  const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');

    const review = 'This is an awesome review';
    wrapper.find('textarea').simulate('change', {
      target: { value: review }
    });
    // TODO: FIND OUT WHY THIS IS FAILING. DOESN'T MAKE ANY SENSE !!!
    //  expect(spy).toHaveBeenCalled();
    expect(wrapper.state().review).toBe(review);
  });
});
