/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Reviews from '../../screens/pages/SingleRecipe/components/Reviews';
import CreateReview from '../../screens/pages/SingleRecipe/components/CreateReview';

import setupTests from '../setupTests';

setupTests();

describe('The Reviews component', () => {
  const props = {
    getRecipeReviews() { },
    params: { id: 1 },
    reviews: {
      1: [{
        createdAt: '2017-12-16T07:12:57.840Z',
        id: '8c3b5c6d-6d33-4e73-8a9e-e141a20b06b2',
        recipeId: '4fd56c98-ce0a-4369-b5ff-0a0a7e883437',
        review: 'nice and lovely',
        updatedAt: '2017-12-16T07:12:57.840Z',
        userId: 'f1dcd707-96fd-4351-85ac-dd4220049aac',
        User: {
          id: 'f1dcd707-96fd-4351-85ac-dd4220049aae',
          createdAt: '2017-12-16T07:12:57.840Z',
          updatedAt: '2017-12-16T07:12:57.840Z',
          name: 'test user',
          email: 'test@user.com'
        }
      }]
    },
    createReview() { },
    checkAuth() { }
  };

  test('Should mount without crashing', () => {
    const shallowTree = shallow(<Reviews {...props} />);
    expect(shallowTree).toMatchSnapshot();
  });
  test('Should display `no reviews yet.` message if no reviews are passed to it', () => {
    const propsWithNoReviews = {
      getRecipeReviews() { },
      params: {},
      reviews: {},
      createReview() { },
      checkAuth() { }
    };

    const tree = mount(<Reviews {...propsWithNoReviews} />);

    expect(tree.contains(<div className="text-center font-weight-bold">No reviews yet.</div>)).toBe(true);
  });
  test('Should show all reviews passed to it', () => {
    const tree = mount(<Reviews {...props} />);
    expect(tree.contains(<div className="text-center font-weight-bold">No reviews yet.</div>)).toBe(false);
    expect(tree.contains(props.reviews[1][0].review)).toBe(true);
  });
  test('Should mount the CreateReview component', () => {
    const tree = mount(<Reviews {...props} />);
    expect(tree.contains(<CreateReview {...props} />)).toBe(true);
  });
});
