/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount } from 'enzyme';
import setupTests from '../setupTests';
import Login from '../../screens/pages/Login';

setupTests();

describe('The Login component', () => {
  const props = {
    signIn() { },
    router: { push() { } }
  };
  test('should mount without crashing', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('Email should be set on state when email input changes', () => {
    const wrapper = mount(<Login {...props} />);
    wrapper.find('#staticEmail').simulate('change', { target: { value: 'test@user.com' } });
    expect(wrapper.state().email).toBe('test@user.com');
  });
  test('Password should be set on state when password input changes', () => {
    const wrapper = mount(<Login {...props} />);
    wrapper.find('#inputPassword').simulate('change', { target: { value: 'password' } });
    expect(wrapper.state().password).toBe('password');
  });
  test('Login button is disabled if the email and password fields are invalid, enabled when email and password are fine', () => {
    const wrapper = mount(<Login {...props} />);
    expect(wrapper.find('button').prop('disabled')).toBe(true);

    wrapper.setState({
      email: 'test@user'
    });

    expect(wrapper.find('button').prop('disabled')).toBe(true);

    wrapper.setState({
      password: 'password'
    });

    expect(wrapper.find('button').prop('disabled')).toBe(true);

    wrapper.setState({
      password: 'password',
      email: 'test@user.com'
    });

    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  test('Should call the signIn prop function when submit form button is clicked', () => {
    const spy = jest.spyOn(props, 'signIn');
    const wrapper = mount(<Login {...props} />);

    wrapper.setState({
      email: 'test@user.com',
      password: 'password'
    });

    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalledWith({ email: 'test@user.com', password: 'password' });
  });
  test('Should set validation errors on component if there are any after calling sign in', () => {
    const errorResponse = 'These credentials do not match our records.';
    const signInError = new Error();
    signInError.response = {
      status: 422,
      data: { data: { errors: errorResponse } }
    };
    const signInErrorProps = {
      ...props,
      signIn() {
        throw signInError;
      }
    };

    const wrapper = mount(<Login {...signInErrorProps} />);

    wrapper.setState({
      email: 'test@user.com',
      password: 'password'
    });

    wrapper.find('button').simulate('click');
    expect(wrapper.state().error).toBe(errorResponse);
  });
  test('Should set server error as error if the errors from server are not validation errors', () => {
    const errorResponse = 'Something went wrong on the server. Please try again later.';
    const signInServerError = new Error();
    signInServerError.response = {
      status: 500,
      data: { data: { errors: errorResponse } }
    };
    const signInErrorProps = {
      ...props,
      signIn() {
        throw signInServerError;
      }
    };

    const wrapper = mount(<Login {...signInErrorProps} />);

    wrapper.setState({
      email: 'test@user.com',
      password: 'password'
    });

    wrapper.find('button').simulate('click');
    expect(wrapper.state().error).toBe(errorResponse);
  });
});
