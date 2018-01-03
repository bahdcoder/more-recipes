import axios from 'axios';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';


import store from '../../store';
import config from '../../config';
import { setStorageItems } from '../localStorage';
import { authenticationSuccess } from '../../store/actions/auth/index';

const logUserIn = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${config.apiUrl}/users/signin`, { name, email, password });
    // dispatch an action to the store to sign up the user.
    const { data } = response.data;
    // AM NOT SO SURE ABOUT WHERE TO DO THIS, BUT FOR NOW LET IT LIVE HERE.
    store.dispatch(authenticationSuccess(data));
    store.dispatch(push('/'));
    // keep token and userId in the browser, cookies or localStorage
    setStorageItems({
      accessToken: data.access_token,
      authUser: data.user
    });
  } catch ({ response }) {
    if (response.status === 422) {
      throw new SubmissionError({
        _error: response.data.data.errors
      });
    }
  }
};

export default logUserIn;
