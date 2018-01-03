import axios from 'axios';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';


import store from '../../store';
import config from '../../config';
import { authenticationSuccess } from '../../store/actions/auth/index';

const signUserUp = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${config.apiUrl}/users/signup`, { name, email, password });
    // dispatch an action to the store to sign up the user.
    // AM NOT SO SURE ABOUT WHERE TO DO THIS, BUT FOR NOW LET IT LIVE HERE.
    store.dispatch(authenticationSuccess(response.data.data));
    store.dispatch(push('/'));
    // keep token and userId in the browser, cookies or localStorage
  } catch ({ response }) {
    if (response.status === 422) {
      throw new SubmissionError({
        email: response.data.data.errors[0]
      });
    }
  }
};

export default signUserUp;
